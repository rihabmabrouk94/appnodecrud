const router = require('express').Router();
const userRoute = require('./user');
const boxRoute = require('./box');
const lineRoute= require('./line');
const machineRoute= require('./machine');
const machinetypeofRoute= require('./machinetypeof');
const machinemodelRoute= require('./machinemodel');
const roleRoute= require('./role');
const clientRoute= require('./client');
const articleRoute= require('./article');
const bundleRoute= require('./bundle');
const orderRoute= require('./order');
const operationRoute= require('./operation');

router.use("/user" , userRoute);
router.use("/box" , boxRoute);
router.use("/line" , lineRoute);
router.use("/machinetypeof" , machinetypeofRoute);
router.use("/machine",machineRoute);
router.use("/machinemodel",machinemodelRoute);
router.use("/role",roleRoute);
router.use("/client",clientRoute);
router.use("/article",articleRoute);
router.use("/bundle",bundleRoute);
router.use("/order",orderRoute);
router.use("/operation",operationRoute);

module.exports = router;
