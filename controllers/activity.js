const { Op } = require('sequelize');
const { Random } = require('mockjs');
const { EquipCall, Activity, PersonCall } = require('../service/model/activity');
const Equip = require('../service/model/equip');
const User = require('../service/model/user');
const Ranking = require('../service/model/ranking');

module.exports = class ActivityController {
  static async listActivity(ctx) {
    let data = await Activity.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    data = JSON.parse(JSON.stringify(data));
    for(const item of data) {
      item.equipments = [];

      const equips = await EquipCall.findAll({
        where: { activityId: item.id },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      for(const equip of equips) {
        const eq = await Equip.findOne({ where: { id: equip.equip } });
        item.equipments.push({
          id: eq.id,
          name: `${eq.type}/${eq.name}`
        });
      }

      const participants = await PersonCall.findAll({
        where: { activityId: item.id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'activityId'] }
      });
      item.participants = participants;
    }
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteActivity(ctx) {
    const info = ctx.request.body;
    console.log(info);
    for(const item of info.equipments) {
      await EquipCall.destroy({
        where: { equip: item.id }
      });
      if (info.status === '进行中') {
        await Equip.update({ status: '在库' }, {
          where: { id: item.id }
        });
      }
    }

    for(const item of info.participants) {
      await PersonCall.destroy({
        where: { username: item.username }
      });
    }
    
    await Activity.destroy({
      where: { id: info.id }
    });

    ctx.body = {
      data: info,
      message: '删除成功',
    };
  }

  static async insertActivity(ctx) {
    const info = ctx.request.body;
    console.log(info);
    
    const record = {};
    const keys = ['activityType', 'reporterName', 'reporterPhone', 'reporterAddress', 'activityAddress', 
      'fund', 'duration', 'userNumRequired', 'skillRequired', 'createTime', 'endTime', 'detail', 'status'
    ]
    for(const key of keys) {
        record[key] = info[key];
    }

    const activity = await Activity.create(record);
    const data = JSON.parse(JSON.stringify(activity));

    data.equipments = info.equipments;
    for(const item of info.equipments) {
      await EquipCall.create({ activityId: data.id, equip: item.id });
      await Equip.update({ status: '使用中' }, {
        where: { id: item.id }
      });
    }
    
    let usersHasTime = await User.findAll({
      where: {
        advantage: data.activityType,
        conditions: { [Op.or]: [0, 1] },
        state: 0,
        isLeave: 0
      }
    });
    if (usersHasTime.length < data.userNumRequired) {
      const otherUsersHasTime = await User.findAll({
        where: {
          advantage: { [Op.not]: data.activityType },
          conditions: { [Op.or]: [0, 1] },
          state: 0,
          isLeave: 0
        }
      });
      usersHasTime = JSON.parse(JSON.stringify(usersHasTime));
      usersHasTime.push(...otherUsersHasTime.slice(0, data.userNumRequired - usersHasTime.length));
    }
    data.participants = [];
    const set = new Set();
    for(let i = 0; i < data.userNumRequired; i++) {
      let k = Random.integer(0, usersHasTime.length - 1);
      while(set.has(k)) {
        k = Random.integer(0, usersHasTime.length - 1);
      }
      set.add(k);
      const p = {
        name: usersHasTime[k].name,
        username: usersHasTime[k].username,
        gender: usersHasTime[k].gender,
        phone: usersHasTime[k].phone,
        isSure: '未确认',
        activityId: data.id
      }
      data.participants.push(p);
      await PersonCall.create(p);
    }

    const res = {
      data,
      message: '',
    };
    ctx.body = res;
  }

  static async updateActivity(ctx) {
    const info = ctx.request.body;
    console.log(info);

    const oldEquipments = await EquipCall.findAll({
      where: {
        activityId: info.id
      }
    });

    const { equipments: newEquipments } = info;
    for(const equip of oldEquipments) {
      const item = newEquipments.find(item => item.id === equip.equip);
      if (!item) {
        await EquipCall.destroy({
          where: { id: equip.id }
        })
      }
    }

    for(const equip of newEquipments) {
      const item = oldEquipments.find(item => item.equip === equip.id);
      if (!item) {
        await EquipCall.create({
          activityId: info.id,
          equip: equip.id
        })
      }
    }

    info.equipments = undefined;
    info.participants = undefined;

    await Activity.update(info, {
      where: { id: info.id }
    });

    ctx.body = {
      message: '更新成功',
      data: {}
    };
  }

  static async rematch(ctx) {
    const info = ctx.request.body;
    console.log(info); // username, id, activityType

    await PersonCall.destroy({
      where: { activityId: info.id, username: info.p.username }
    });

    let usersHasTime = await User.findAll({
      where: {
        advantage: info.activityType,
        conditions: { [Op.or]: [0, 1] },
        state: 0,
        isLeave: 0
      }
    });
    
    let data = 0;
    for(const p of usersHasTime) {
      const item = info.participants.find(item => item.username === p.username);
      if (!item) {
        data = {
          "name": p.name,
          "username": p.username,
          "gender": p.gender,
          "phone": p.phone,
          "isSure": '未确认'
        }
        break;
      }
    }

    if (data === 0) {
      const p = await User.findOne({
        where: {
          advantage: { [Op.not]: data.activityType },
          conditions: { [Op.or]: [0, 1] },
          state: 0,
          isLeave: 0
        }
      });
      data = {
        "name": p.name,
        "username": p.username,
        "gender": p.gender,
        "phone": p.phone,
        "isSure": '未确认'
      }
    }

    await PersonCall.create({...data, activityId: info.id});

    ctx.body = {
      message: '匹配成功',
      data
    }
  }

  static async sure(ctx) {
    const info = ctx.request.body;
    console.log(info);

    await PersonCall.update({isSure: '确认'}, {
      where: {
        activityId: info.id, username: info.p.username
      }
    });

    await User.update({ state: 1 }, {
      where: { username: info.p.username }
    });

    ctx.body = {
      data: {},
      message: '确认成功'
    }
  }

  static async finish(ctx) {
    const info = ctx.request.body;
    console.log(info);

    const types = ['应急救援', '社会救助', '社会培训', '宣讲演练', '其他'];
    const scores = [6, 4, 2, 2, 2];
    const score = scores[types.indexOf(info.activityType)] * info.duration + info.rate['总体'];
    for(const p of info.participants) {
      await Ranking.increment({ score: score + info.rate[p.name] }, { where: { username: p.username } });
      await User.update({ state: 0 }, {
        where: { username: p.username }
      });
    }

    for(const item of info.equipments) {
      await Equip.update({ status: '在库' }, {
        where: { id: item.id }
      });
    }

    await Activity.update({ status: '已结束' }, {
      where: {id: info.id}
    });

    ctx.body = {
      data: {},
      message: '成功结项'
    }
  }
}
