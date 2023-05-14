const Fund = require('../service/model/fund');

module.exports = class FundController {
  static async listFund(ctx) {
    console.log(ctx.request.body);
    const data = await Fund.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteFund(ctx) {
    const info = ctx.request.body;
    console.log(info);
    await Fund.destroy({
      where: { id: info.id }
    });
    ctx.body = {
      data: info,
      message: '删除成功',
    };
  }

  static async insertFund(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const newFund = await Fund.create(info);
    const res = {
        data: newFund,
        message: '添加成功',
    };
    ctx.body = res;
  }

  static async updateFund(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const data = await Fund.update(info, {
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
