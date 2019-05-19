const { findServer } = require('./onlineServer'); //importing package functioins
const servers = require('./data/data'); //mock data

findServer(servers) //fetching the sever with lowest priority
    .then(data=>{
        console.log('data is', data)  //online server with lowest priority
    })
    .catch(err=>{
        console.log(err.message);  //if some error or no server is online
    })