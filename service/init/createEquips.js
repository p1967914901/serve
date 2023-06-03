const Equip = require('../model/equip');
const mockjs = require("mockjs");

const data = mockjs.mock({
  status: 1,
  "data|180": [
    {
    //   "id|+1": 0,
      // 'type|1': ['照明设备', '通信设备', '基础设备'],
      // 'name|1': ['照明车'],
      reason: "@cparagraph",
      "status|1": ["在库", "使用中", "维修"],
      createTime: '@date("yyyy-MM-dd")', // 时间
    },
  ],
});
const equips = {
  照明设备: ["照明车", "手电筒", "灯具及配件"],
  通信设备: ["对讲机"],
  医疗设备: [
    "担架",
    "酒精",
    "防护服",
    "夹板",
    "医疗口罩",
    "放毒面具",
    "医疗包",
    "急救药箱",
  ],
  水上救援设备: ["皮划艇", "马达", "发动机", "快艇", "救生衣"],
  特殊设备: ["运输车", "探测仪", "无人机"],
  消防设备: ["灭火器", "铁锹", "锤子", "消防栓扳手", "撬棍", "斧子"],
  基础设备: [
    "五金工具箱",
    "安全梯",
    "便携雨衣",
    "喇叭",
    "水桶",
    "反光背心",
    "布手套",
    "一次性手套",
    "毛巾",
    "安全标志牌",
  ],
};
const len = 5;
let i = 0;
for (const key in equips) {
  for (const name of equips[key]) {
    for (let k = i; k < i + len; k++) {
      data.data[k].type = key;
      data.data[k].name = name;
    }
    i += len;
  }
}

module.exports = async () => {
  await Equip.sync({ force: true });
  await Equip.bulkCreate(data.data);
}
