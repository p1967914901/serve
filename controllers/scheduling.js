const Scheduling = require('../service/model/scheduling');

module.exports = class SchedulingController {
  static async listScheduling(ctx) {
    const data = await Scheduling.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteScheduling(ctx) {
    const info = ctx.request.body;
    console.log(info);
    await Scheduling.destroy({
      where: { id: info.id }
    });
    ctx.body = {
      data: info,
      message: '删除成功',
    };
  }

  static async insertScheduling(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const newScheduling = await Scheduling.create(info);
    const res = {
        data: newScheduling,
        message: '添加成功',
    };
    ctx.body = res;
  }

  static async updateScheduling(ctx) {
    const info = ctx.request.body;
    console.log(info);
    
    const result = await Scheduling.findOne({ where: { year: info.year, month: info.month, day: info.day } });
    if (result === null) {
      const data = await Scheduling.create(info);
      ctx.body = {
        data, message: '添加成功'
      }
    } else {
      const data = await Scheduling.update(info, {
        where: { id: result.id }
      });
      ctx.body = {
        data, message: '编辑成功'
      }
    }
  }
}
