const router = require('express').Router();
const userRoute = require('./user');
const boxRoute = require('./box');
const lineRoute= require('./line')
const machineRoute= require('./machine')
const machinetypeofRoute= require('./machinetypeof')
const machinemodelRoute= require('./machinemodel')

router.use("/user" , userRoute);
router.use("/box" , boxRoute);
router.use("/line" , lineRoute);
router.use("/machinetypeof" , machinetypeofRoute);
router.use("/machine",machineRoute);
router.use("/machinemodel",machinemodelRoute);

module.exports = router;
