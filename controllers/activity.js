const fs = require('fs');

module.exports = class ActivityController {
  static async listActivity(ctx) {
    console.log(ctx.request.body)
    const file = await fs.readFileSync('./data/activityList.json');
    const data = JSON.parse(file.toString());
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteActivity(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const file = await fs.readFileSync('./data/activityList.json');
    let data = JSON.parse(file.toString());
    const res = {
        data: {},
        message: '',
    };
    data = data.filter(item => item.id !== info.id)
    res.data = info;
    res.message = '删除成功';
    await fs.writeFileSync('./data/activityList.json', JSON.stringify(data));
    ctx.body = res;
  }

  static async insertActivity(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const file = await fs.readFileSync('./data/activityList.json');
    const data = JSON.parse(file.toString());
    const res = {
        data: {},
        message: '',
    };
    const record = {};
    for(const key of Object.keys(data[0])) {
        record[key] = info[key];
    }
    record.id = data.length;

    const userFile = await fs.readFileSync('./data/userList.json');
    let userData = JSON.parse(userFile.toString());
    const participants = [];
    let count = 0;
    for(let i = 0; i < userData.length; i++) {
      if (userData[i].state === 0) {
        participants.push({
          name: userData[i].name,
          username: userData[i].username,
          gender: userData[i].gender,
          phone: userData[i].phone,
          isSure: '未确认'
        });
        count ++;
        if (count === record.userNumRequired) {
          break;
        }
      }
    }
    record.participants = participants;

    data.unshift(record);
    res.data = record;
    res.message = '添加成功';
    await fs.writeFileSync('./data/activityList.json', JSON.stringify(data));
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
