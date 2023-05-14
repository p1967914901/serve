const User = require('../service/model/user');

module.exports = class UserController {
  static async listUsers(ctx) {
    console.log(ctx.request.body);
    const data = await User.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteUser(ctx) {
    const info = ctx.request.body;
    console.log(info);
    await User.destroy({
      where: { username: info.username }
    });
    ctx.body = {
      data: info,
      message: '删除成功',
    };
  }

  static async insertUser(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const newUser = await User.create(info);
    const res = {
        data: newUser,
        message: '添加成功',
    };
    ctx.body = res;
  }

  static async updateUser(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const data = await User.update(info, {
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
