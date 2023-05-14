const Scheduling = require('../model/scheduling');
const mockjs = require("mockjs");

const data = mockjs.mock({
  "data|744": [
    {
    //   "id|+1": 0,
        year: 0,
        month: 0,
        day: 0,
        name1: "@cname",
        username1: "@id",
        name2: "@cname",
        username2: "@id",
    },
  ],
});
let i = 0;
for (let year = 2022; year < 2024; year++) {
  for (let month = 1; month < 13; month++) {
    for (let day = 1; day < 32; day++) {
      data.data[i].year = year;
      data.data[i].month = month;
      data.data[i].day = day;
      i++;
    }
  }
}

module.exports = async () => {
  await Scheduling.sync({ force: true });
  await Scheduling.bulkCreate(data.data);
}
