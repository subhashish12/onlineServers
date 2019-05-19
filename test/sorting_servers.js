const assert = require("assert");

describe('to sort the servers based on priority', ()=>{
    it('sorting a servers based on priorities', ()=>{
        const data = [ { url: 'http://google.com', priority: 6 },
        { url: 'http://boldtech.co', priority: 1 },
        { url: 'https://dewssoluastions.udemy.com', priority: 5 },
        { url: 'https://repl.it/@subhashishnegi/assignment',
          priority: 8 } ]

        let sortServers = data.sort((a, b) => Number(a.priority) - Number(b.priority));
        assert( sortServers[0].priority == 1 &&  sortServers[3].priority == 8 )
    })
})
