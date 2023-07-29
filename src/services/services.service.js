const { Service } = require("../models");


const createService = async (createBody) => {
    return Service.create(createBody);
};

const deleteService = async (id) => {
    return Service.deleteOne({ serviceId: id })
};

const editService = async (id, updateBody) => {
    let objForUpdate = {};
    if (updateBody.name) objForUpdate.name = updateBody.name;
    if (updateBody.serviceType) objForUpdate.serviceType = updateBody.serviceType;
    if (updateBody.isActive) objForUpdate.isActive = updateBody.isActive;
    return Service.updateOne({ serviceId: id }, { $set: objForUpdate })
};

const getService = async (query) => {
    let data = {}
    data.data = await Service.find({}).sort({ "updatedAt": -1 }).skip(query.page * query.limit).limit(query.limit)
    data.count = await Service.countDocuments()
    return data
};

const getServicesBySearch = async (query) => {
    let data = {}
    data.data = await Service.find({ name: { $regex: ".*" + query.searchKey + ".*", $options: "i" } }).sort({ "updatedAt": -1 }).skip(query.page * query.limit).limit(query.limit)
    data.count = await Service.countDocuments()
    return data
};

const getServiceByFilter = async (query) => {
    let data = {}
    data.data = await Service.aggregate(
        [
            {
                $match: {
                    $and: [
                        {
                            name: {
                                $in: query.name,
                            },
                        },
                        {
                            serviceType: {
                                $in: query.serviceType,
                            },
                        },
                        {
                            isActive: {
                                $in: query.isActive,
                            }
                        },
                    ]
                },
            },
            {
                $sort: {
                    "updatedAt": -1
                }
            },
            {
                $skip: query.page * query.limit,
            },
            {
                $limit: query.limit,
            },
        ]
    )

    data.count = await Service.countDocuments({ $and: [{ name: { $in: query.name } }, { serviceType: { $in: query.serviceType } }, { isActive: { $in: query.isActive } }] })

    return data

};

const getTelcoNameList = async (query) => {
    return Service.find({}).distinct('name')
};

const getTelcoTypeList = async (query) => {
    return Service.find({}).distinct('serviceType')
};

module.exports = {
    createService,
    getService,
    getServiceByFilter,
    getTelcoNameList,
    getTelcoTypeList,
    getServicesBySearch,
    deleteService,
    editService
};




