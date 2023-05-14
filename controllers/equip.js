// const fs = require('fs');
const Equip = require('../service/model/equip');

module.exports = class EquipController {
  static async listEquip(ctx) {
    const data = await Equip.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteEquip(ctx) {
    const info = ctx.request.body;
    console.log(info);
    await Equip.destroy({
      where: { id: info.id }
    });
    ctx.body = {
      data: info,
      message: '删除成功',
    };
  }

  static async insertEquip(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const newEquip = await Equip.create(info);
    const res = {
        data: newEquip,
        message: '添加成功',
    };
    ctx.body = res;
  }

  static async updateEquip(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const data = await Equip.update(info, {
      where: {
        id: info.id
      }
    })
    const res = {
        data,
        message: '更新成功',
    };
    ctx.body = res;
  }
}
