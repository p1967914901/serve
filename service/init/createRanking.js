const Ranking = require('../model/ranking');
const mockjs = require("mockjs");

const data = mockjs.mock({
    'data|100': [{
        // 'id|+1': 0,
        'username': '@cname',
        'name': '@cname',
        'score|100-500': 1,
    }],
});

module.exports = async () => {
  await Ranking.sync({ force: true });
  await Ranking.bulkCreate(data.data);
}
