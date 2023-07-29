const express = require('express');
const router = express.Router();
const { serviceController } = require("../../controllers")

router
    .route('/')
    .post(serviceController.createService)

router
    .route('/:serviceId')
    .put(serviceController.editService)
    .delete(serviceController.deleteService);

router
    .route('/getServiceByFilter')
    .post(serviceController.getServicesByFilter)

router
    .route('/getServiceBySearch')
    .post(serviceController.getServicesBySearch)

router
    .route('/getTelcoNameList')
    .get(serviceController.getTelcoNameList)

router
    .route('/getTelcoTypeList')
    .get(serviceController.getTelcoTypeList)

module.exports = router;