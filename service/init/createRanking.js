const mockjs = require('mockjs');
const Ranking = require('../model/ranking');
const users = require('./user');

// const data = mockjs.mock({
//     'data|100': [{
//         // 'id|+1': 0,
//         'username': '@cname',
//         'name': '@cname',
//         // 'score|100-500': 1,
//     }],
// });



module.exports = async () => {
  // const users = User.findAll();

  const grades = [
    '倔强青铜', '秩序白银', '荣耀黄金', '尊贵铂金', '永恒钻石', '至尊星耀', '最强王者', '无双王者', '荣耀王者', '传奇王者'
  ];
  
  const scores = [
    10, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000
  ]
  const data = []
  for(let i = 0; i < users.length; i++) {
    data.push({
      name: users[i].name,
      username: users[i].username,
    });
    data[i].grade = grades[i % 10];
    data[i].score = scores[i % 10] + mockjs.Random.integer(1, 38);
    if (data[i].username === 'admin') {
      data[i].grade = '传奇王者';
      data[i].score = 34576
    }
  }

  await Ranking.sync({ force: true });
  await Ranking.bulkCreate(data);
}
