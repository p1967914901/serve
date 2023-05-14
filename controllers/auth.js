const User = require('../service/model/user');

module.exports = class AuthController {
  static async login(ctx) {
    console.log(ctx.request.body);
    const { username, password } = ctx.request.body;
    const res = {
        data: {},
        message: '密码错误或用户名不存在',
    };
    const user = await User.findOne({
      where: {
        username, password
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (user) {
      res.data = user;
      res.message = '登录成功';
    }
    ctx.body = res;
  }

  static async register(ctx) {
    ctx.body = "Register controller";
  }
}
