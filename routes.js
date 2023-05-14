const Router = require('@koa/router');

const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');
const EquipController = require('./controllers/equip');
const FundController = require('./controllers/fund');
const ActivityController = require('./controllers/activity');
const SchedulingController = require('./controllers/scheduling');
const RankingController = require('./controllers/ranking');





const router = new Router();
 
// auth 相关的路由
router.post('/auth/login', AuthController.login);

// users 相关的路由
router.post('/user/list', UserController.listUsers);
router.post('/user/update', UserController.updateUser);
router.post('/user/insert', UserController.insertUser);
router.post('/user/delete', UserController.deleteUser);

// equip 相关的路由
router.post('/equip/list', EquipController.listEquip);
router.post('/equip/update', EquipController.updateEquip);
router.post('/equip/insert', EquipController.insertEquip);
router.post('/equip/delete', EquipController.deleteEquip);
 
// fund 相关的路由
router.post('/fund/list', FundController.listFund);
router.post('/fund/update', FundController.updateFund);
router.post('/fund/insert', FundController.insertFund);
router.post('/fund/delete', FundController.deleteFund);

// activity 相关的路由
router.post('/activity/list', ActivityController.listActivity);
router.post('/activity/update', ActivityController.updateActivity);
router.post('/activity/insert', ActivityController.insertActivity);
router.post('/activity/delete', ActivityController.deleteActivity);

// scheduling 相关的路由
router.post('/scheduling/list', SchedulingController.listScheduling);
router.post('/scheduling/update', SchedulingController.updateScheduling);
router.post('/scheduling/insert', SchedulingController.insertScheduling);
router.post('/scheduling/delete', SchedulingController.deleteScheduling);

// ranking 相关的路由
router.post('/ranking/list', RankingController.listRanking);
router.post('/ranking/update', RankingController.updateRanking);
router.post('/ranking/insert', RankingController.insertRanking);
router.post('/ranking/delete', RankingController.deleteRanking);

module.exports = router;