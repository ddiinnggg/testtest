class option{
    constructor(cid, aud, cost, fixed){
        this.cid = cid;
        this.aud = aud;
        this.cost = cost;
        this.fixed = fixed;
    }
}

function bestop(arr, budget){
    let weights = [];
    // remove shit
    arr.forEach((e, i) => {
        if(e.fixed){
            if (budget < e.cost){
                arr.splice(i, 1);
            }
        }
    });
    arr.forEach((e) => {
        weights.push(e.aud/e.cost);
    });
    return weights;
}

console.log(bestop([new option(1, 10000, 25, 0), new option(1, 12000, 20, 1), new option(2, 5000, 10, 1), new option(3, 8000, 30, 0)], 19))
