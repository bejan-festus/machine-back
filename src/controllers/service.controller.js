
const httpStatus = require('http-status');
const { servicesService } = require('../services');
const generateUid = require('../utils/generateId');


const createService = async (req, res) => {
    req.body.serviceId = generateUid()
    const service = await servicesService.createService(req.body);
    res.status(httpStatus.CREATED).send(service);
};

const deleteService = async (req, res) => {
    const service = await servicesService.deleteService(req.params.serviceId);
    res.send(service);
};

const editService = async (req, res) => {
    const service = await servicesService.editService(req.params.serviceId, req.body);
    res.send(service);
};

const getServicesByFilter = async (req, res) => {
    if(req.body.name !== null && req.body.serviceType !== null && req.body.isActive !== null){
    const serviceList = await servicesService.getServiceByFilter(req.body);
    res.send(serviceList);
    }else{
    const serviceList = await servicesService.getService(req.body);
    res.send(serviceList);
    }
};

const getServicesBySearch = async (req, res) => {
    const serviceList = await servicesService.getServicesBySearch(req.body);
    res.send(serviceList);
};

const getTelcoNameList = async (req, res) => {
    const telcoNameList = await servicesService.getTelcoNameList();
    res.send({data:telcoNameList});
};

const getTelcoTypeList = async (req, res) => {
    const telcoTypeList = await servicesService.getTelcoTypeList();
    res.send({data:telcoTypeList});
};


module.exports = {
    createService,
    getServicesByFilter,
    getServicesBySearch,
    getTelcoNameList,
    getTelcoTypeList,
    deleteService,
    editService
};