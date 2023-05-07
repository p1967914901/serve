const fs = require('fs');

module.exports = class AuthController {
  static async login(ctx) {
    console.log(ctx.request.body)
    const { username, password } = ctx.request.body;
    const file = await fs.readFileSync('./data/userList.json');
    const data = JSON.parse(file.toString());
    const res = {
        data: {},
        message: '密码错误或用户名不存在',
    };
    for (let i = 0; i < data.length; i++) {
        if (data[i]['username'] === username && data[i]['password'] === password) {
            res.data = data[i];
            res.message = '登录成功';
            break;
        }
    }
    ctx.body = res;
  }

  static async register(ctx) {
    ctx.body = "Register controller";
  }
}
