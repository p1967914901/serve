const User = require('../model/user');
const mockjs = require('mockjs');

const { Random } = mockjs;

// 拓展mockjs
Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/) //Number()
  }
});

const data = mockjs.mock({
    'data|100': [{
        // 'id|+1': 1,
        'name': '@cname',
        'username': '@id',
        'gender|1': [0, 1],
        'phone': '@phone',
        'birthday': '@date("yyyy-MM-dd")',
        'idNo': '@id', // 身份证号
        'workingSeniority|1-10': 0, // 从业年限
        'conditions|1': [0, 1, 2], // 0-一般 1-健康 2-带伤
        'job': '工作',
        'workPlace': '工作地点',
        'skill': '技能',
        'advantage|1': ['应急救援', '社会救助', '社会培训', '宣讲演练', '其他'],
        'grade|1': [0, 1], // 0-队长 1-队员
        'state|1': [0, 1, 2], // 0-在岗 1-出任务 2-忙碌
        'isLeave|1': [0, 1], // 0-在队 1-离队
        'reason': '原因',
        'password': '123456',
        'createTime': '@date("yyyy-MM-dd")', // 入队时间
    }]
});

module.exports = async () => {
    await User.sync({ force: true });
    await User.bulkCreate(data.data);
};
