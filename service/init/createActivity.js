const { EquipCall, Activity, PersonCall } = require('../model/activity');
const mockjs = require("mockjs");
const { Random } = mockjs;

function getTimeFormat (format = 'yyyy-MM-dd') {
    const date = new Date();
    const year = date.getFullYear(); // 年份
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份，注意要补零
    const day = String(date.getDate()).padStart(2, '0'); // 日，注意要补零
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if (format === 'yyyy-MM-dd') {
        return `${year}-${month}-${day}`; // 返回格式化后的日期字符串
    } else if (format === 'yyyy-MM-dd HH:mm') {
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    return '';
}
function compareTime(time1, time2) {
    const date1 = new Date(time1.replace(/-/g, '/'));
    const date2 = new Date(time2.replace(/-/g, '/'));
    return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
  }



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
        'status|1': ['进行中', '已结束', '未开始'],
        'reporterName': '@cname',
        'reporterPhone': '@phone',
        'reporterAddress': '@county(true)',
        // 'equipCall': [], //'', '手电筒', '灯具及配件'
        'activityAddress': '@county(true)',
        'fund|100-500': 1,
        'duration|1-10': 1,
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

for(const p of data.data) {
    const year = 2023;
    const month = String(Random.integer(1, 12)).padStart(2, '0');
    const day = String(Random.integer(1, 28)).padStart(2, '0');
    const hour = String(Random.integer(0, 12)).padStart(2, '0');
    const mine = String(Random.integer(0, 59)).padStart(2, '0');
    const afterHour = String(parseInt(hour) + p.duration).padStart(2, '0');
    p.createTime = `${year}-${month}-${day} ${hour}:${mine}`;
    p.endTime = `${year}-${month}-${day} ${afterHour}:${mine}`;
    const now = getTimeFormat('yyyy-MM-dd HH:mm');
    p.status = compareTime(p.endTime, now) <= 0 ? '已结束' : (compareTime(p.createTime, now) <= 0 ? '进行中' : '未开始');
}

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
