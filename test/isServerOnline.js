const assert = require("assert");
const { isOnline, getOnlineServers } = require('../onlineServer');

describe('To Check if Server Is Online', ()=>{ 
   it("to check if Server is Online", ()=>{
     isOnline("http://google.com")
     .then((resp)=>{
        assert(resp == true);
     })
     .catch(err=>{
         console.log('errors are', err)
     })
   })

   it("to get all the online servers",()=>{
        var data = [{ 
            "url": "http://offline.boldtech.co", "priority": 2 }, { 
            "url": "http://google.com", "priority": 6 }]

        getOnlineServers(data)
            .then((resp)=>{
              assert(resp.length == 1)
            })
   })
})