const Eureka = require('eureka-js-client').Eureka;

// Configure Eureka client
const client = new Eureka({
    instance: {
        app: 'brand-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1', // Use '127.0.0.1' or the actual IP address
        port: {
            '$': 5000,
            '@enabled': 'true',
        },
        vipAddress: 'brand-service', // Match this with the app name
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/', // Correct path
    }
});

// Start Eureka client
client.start(error => {
    console.log('Eureka client started with error:', error);
});
