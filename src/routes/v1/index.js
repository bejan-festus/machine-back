const express = require('express');
const router = express.Router();
const serviceRoute = require('./service.route')

const defaultRoutes = [
    {
        path: '/service',
        route: serviceRoute,
    }
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
