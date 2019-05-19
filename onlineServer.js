const request = require('request');

//to find the lowest priority online server among various others
function findServer(servers){ 
    return new Promise((resolve, reject)=>{
        var onlineServers = getOnlineServers(servers);
            onlineServers
            .then(data =>{
                if(data.length){
                    console.log('online servers are', data);
                    let sortedServers = getSortedServers(data)
                    resolve(sortedServers[0])
                }else{
                    reject({message:"All servers are offline"})
                }
            })
    })
}

// to get the all online servers
const getOnlineServers = (servers) => {
    var count = 0;
    var onlineServers = []
    return new Promise((resolve, reject)=>{
        for (let i = 0; i < servers.length; i++) {
            let isOnlineServer = isOnline(servers[i].url);
            isOnlineServer
                .then(resp => {
                    onlineServers.push(servers[i])
                    count++;
                    if (count == servers.length) {
                        resolve(onlineServers)
                    }
                })
                .catch(err => {
                    count++;
                    if (count == servers.length) {
                        resolve(onlineServers)
                    }
                })
        }
    })
}

// to check if a server given URL is online or not
function isOnline(link) {
    return new Promise((resolve, reject) => {
        let req = request(link, { json: true }, (err, res, body) => {
            if (err) reject(err);
            if (res) {
                if(res.statusCode > 199 && res.statusCode < 300 )  resolve((true));
                else reject(false);
            }
        })

        //after 5 sec. kill the request
        setTimeout(()=>{
            req.abort();
            reject({message:"req timeout"})
        },5000)
    })
}

const getSortedServers = (data)=>{
    let sortServers = data.sort((a, b) => Number(a.priority) - Number(b.priority));
    return sortServers;
}

module.exports = { //export the functions from module to access functions in other files
    findServer,
    getOnlineServers,
    isOnline
}