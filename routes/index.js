const router = require('express').Router();
const userRoute = require('./user');
const boxRoute = require('./box');
const lineRoute= require('./line');
const machineRoute= require('./machine');
const machinetypeofRoute= require('./machinetypeof');
const machinemodelRoute= require('./machinemodel');
const roleRoute= require('./role');

router.use("/user" , userRoute);
router.use("/box" , boxRoute);
router.use("/line" , lineRoute);
router.use("/machinetypeof" , machinetypeofRoute);
router.use("/machine",machineRoute);
router.use("/machinemodel",machinemodelRoute);
router.use("/role",roleRoute);
module.exports = router;
