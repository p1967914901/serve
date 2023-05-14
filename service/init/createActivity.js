const { EquipCall, Activity, PersonCall } = require('../model/activity');
const mockjs = require("mockjs");
const { Random } = mockjs;

// 拓展mockjs
Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/) //Number()
  }
});
const equipCall = mockjs.mock({
    'data|300': [{
        'activityId|1-100': 1,
        'equip|1-180': 1
    }]
})

const data = mockjs.mock({
    'status': 1,
    'data|100': [{
        // 'id|+1': 0,
        'activityType|1': ['应急救援', '社会救助', '社会培训', '宣讲演练', '其他'],
        'reporterName': '@cname',
        'reporterPhone': '@phone',
        'reporterAddress': '@county(true)',
        // 'equipCall': [], //'', '手电筒', '灯具及配件'
        'activityAddress': '@county(true)',
        'fund|100-500': 1,
        'duration|1-5': 1,
        'userNumRequired|3-6': 1,
        'skillRequired': '需要的技能',
        'createTime': '@datetime("yyyy-MM-dd HH:mm")',
        'endTime': '@datetime("yyyy-MM-dd HH:mm")',
        'detail': '@cparagraph',
        // 'participants|3': [{
        //     'name': '@cname',
        //     'username': '@id',
        //     'gender|1': [0, 1],
        //     'phone': '@phone',
        //     'isSure|1': ['确认', '未确认']
        // }]
    }]
});

const personCall = [];

for(let i = 0; i < data.data.length; i++) {
    for (let k = 0; k < data.data[i].userNumRequired; k++) {
        p = mockjs.mock({
            'name': '@cname',
            'username': '@id',
            'gender|1': [0, 1],
            'phone': '@phone',
            'isSure|1': ['确认', '未确认']
        });
        p.activityId = i + 1;
        personCall.push(p);
    }
}

module.exports = async () => {
    await EquipCall.sync({ force: true });
    await EquipCall.bulkCreate(equipCall.data)

    await Activity.sync({ force: true });
    await Activity.bulkCreate(data.data);

    await PersonCall.sync({ force: true });
    await PersonCall.bulkCreate(personCall);
}
