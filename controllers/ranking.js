const Ranking = require('../service/model/ranking');

module.exports = class RankingController {
  static async listRanking(ctx) {
    const data = await Ranking.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteRanking(ctx) {
    const info = ctx.request.body;
    console.log(info);
    await Ranking.destroy({
      where: { id: info.id }
    });
    ctx.body = {
      data: info,
      message: '删除成功',
    };
  }

  static async insertRanking(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const newRanking = await Ranking.create(info);
    const res = {
        data: newRanking,
        message: '添加成功',
    };
    ctx.body = res;
  }

  static async updateRanking(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const data = await Ranking.update(info, {
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
