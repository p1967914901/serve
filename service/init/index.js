const createUserList = require('./createUsers');
const createEquipList = require('./createEquips');
const createFundList = require('./createFunds');
const createRankingList = require('./createRanking');
const createSchedulingList = require('./createScheduling');
const createActivityList = require('./createActivity');

(async () => {
    await createUserList();
    await createEquipList();
    await createFundList();
    await createRankingList();
    await createSchedulingList();
    await createActivityList();
})();