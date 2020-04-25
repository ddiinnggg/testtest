class option{
    constructor(opid, cid, aud, cost, fixed){
        this.opid = opid;
        this.cid = cid;
        this.aud = aud;
        this.cost = cost;
        this.fixed = fixed;
    }
}

function bestop(arr, budget){
    let result = [];
    let newarr = [];
    // remove shit
    for (e of arr){
        if (e.fixed && budget < e.cost) continue;
        newarr.push([e.aud/e.cost, e]);
    }
    newarr.sort((a, b) => (b[0]-a[0]));
    console.log(newarr)
    console.log(" ========== geag=  = = = == = =")
    newarr.forEach(([w, e]) => {
        let res = {};
        let ncost = 0;
        if (e.fixed){
            ncost = Math.floor(budget / e.cost) >= 1 ? e.cost : null;
        }
        else{
            let part = budget / e.cost;
            ncost = part >= 1 ? e.cost : e.cost * part;
        }
        if (ncost){
            budget -= ncost;
            res["opid"] = e.opid;
            res["aud"] = ncost * w;
            res["cost"] = ncost;
            result.push(res);
        }
    })
    return result;
}

console.log(bestop([new option(1, 1, 10000, 25, 0), new option(2, 1, 12000, 20, 1), new option(3, 2, 5000, 10, 1), new option(4, 3, 8000, 30, 0)], 52));
