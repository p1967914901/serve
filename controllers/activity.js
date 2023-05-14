const { Op } = require('sequelize');
const { Random } = require('mockjs');
const { EquipCall, Activity, PersonCall } = require('../service/model/activity');
const Equip = require('../service/model/equip');
const User = require('../service/model/user');

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
      'fund', 'duration', 'userNumRequired', 'skillRequired', 'createTime', 'endTime', 'detail'
    ]
    for(const key of keys) {
        record[key] = info[key];
    }

    const activity = await Activity.create(record);
    const data = JSON.parse(JSON.stringify(activity));

    data.equipments = info.equipments;
    for(const item of info.equipments) {
      await EquipCall.create({ activityId: data.id, equip: item.id });
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
    const file = await fs.readFileSync('./data/activityList.json');
    const data = JSON.parse(file.toString());
    const res = {
        data: {},
        message: '',
    };
    for (let i = 0; i < data.length; i++) {
        if (data[i]['id'] === info.id) {
            for(const key of Object.keys(data[i])) {
                if (key !== "id") {
                    // console.log(key)
                    data[i][key] = info[key];
                }
            }
            res.message = '更新成功';
            res.data = JSON.parse(JSON.stringify(data[i]));
            break;
        }
    }
    await fs.writeFileSync('./data/activityList.json', JSON.stringify(data));
    ctx.body = res;
  }


}
