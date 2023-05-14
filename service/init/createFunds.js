const Fund = require('../model/fund');
const mockjs = require("mockjs");

const data = mockjs.mock({
  "data|100": [
    {
    //   "id|+1": 0,
      "type|1": ["收入", "支出"],
      "num|1000-10000": 1,
      "track|1": [
        "政府下拨",
        "企业捐助",
        "个人自筹",
        "购买服务",
        "其他",
        "办公支出",
        "购买设备",
        "培训费用",
        "团建费用",
        "其他",
      ],
      detail: "@cparagraph",
      createTime: '@date("yyyy-MM-dd")', // 时间
    },
  ],
});

module.exports = async () => {
  await Fund.sync({ force: true });
  await Fund.bulkCreate(data.data);
}
