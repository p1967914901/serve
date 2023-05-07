const fs = require('fs');

module.exports = class RankingController {
  static async listRanking(ctx) {
    console.log(ctx.request.body)
    const file = await fs.readFileSync('./data/rankingList.json');
    const data = JSON.parse(file.toString());
    const res = {
        data,
        message: '',
    };
    ctx.body = res;
  }

  static async deleteRanking(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const file = await fs.readFileSync('./data/rankingList.json');
    let data = JSON.parse(file.toString());
    const res = {
        data: {},
        message: '',
    };
    data = data.filter(item => item.id !== info.id)
    res.data = info;
    res.message = '删除成功';
    await fs.writeFileSync('./data/rankingList.json', JSON.stringify(data));
    ctx.body = res;
  }

  static async insertRanking(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const file = await fs.readFileSync('./data/rankingList.json');
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
    data.unshift(record);
    res.data = record;
    res.message = '添加成功';
    await fs.writeFileSync('./data/rankingList.json', JSON.stringify(data));
    ctx.body = res;
  }

  static async updateRanking(ctx) {
    const info = ctx.request.body;
    console.log(info);
    const file = await fs.readFileSync('./data/rankingList.json');
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
    await fs.writeFileSync('./data/rankingList.json', JSON.stringify(data));
    ctx.body = res;
  }


}
