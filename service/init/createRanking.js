const Ranking = require('../model/ranking');
const mockjs = require("mockjs");

const data = mockjs.mock({
    'data|100': [{
        // 'id|+1': 0,
        'username': '@cname',
        'name': '@cname',
        // 'score|100-500': 1,
    }],
});

const grades = [
  '倔强青铜', '秩序白银', '荣耀黄金', '尊贵铂金', '永恒钻石', '至尊星耀', '最强王者', '无双王者', '荣耀王者', '传奇王者'
];

const scores = [
  10, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000
]

for(let i = 0; i < data.data.length; i++) {
  data.data[i].grade = grades[i % 10];
  data.data[i].score = scores[i % 10] + mockjs.Random.integer(1, 38);
}

module.exports = async () => {
  await Ranking.sync({ force: true });
  await Ranking.bulkCreate(data.data);
}
