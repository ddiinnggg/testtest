class avail{
    constructor(meetID, availID, personID, start, end){
        this.meetID = meetID;
        this.aid = availID;
        this.pid = personID;
        this.start = start;
        this.end = end;
    }
}

function find(arr, mid, time, st, ed){
    let newarr = [];
    let uqp = [];
    arr = arr.filter((e) => {return e["meetID"] == mid})
    console.log(arr)
    arr.sort((a, b) => a["start"]-b["start"]);
    // clean stuff
    for (x of arr){
        if (x.end <= st |x.start >= ed) continue;
        if (x.start < st) x.start = st;
        if (x.end > ed) x.end = ed;
        newarr.push(x);
        uqp.push(x.pid);
    }
    // get unique person id
    uqp = [... new Set(uqp)];
    let newarr2 = [];
    // turn new arr2 2d
    for (x of uqp){
        newarr2.push([]);
    }
    // push all avail of 1 person into an array
    newarr.forEach((e, i) => {
        newarr2[uqp.indexOf(e.pid)].push(e)
    });
    // sort by starting time and merge
    let newarr3 = [];
    newarr2.forEach((e, i) => {
        e.sort((a, b) => a.start-b.start);
        if (e.length > 1){
            for (let ii = 0; ii < e.length; ii++){
                if (e[ii+1] != undefined){
                    //console.log(e[ii], e[ii+1])
                    if (e[ii].end >= e[ii+1].end){
                        e.splice(ii+1, 1);
                        ii--;
                    }
                    else if (e[ii].end >= e[ii+1].start){
                        e[ii+1].start = e[ii].start;
                        e.splice(ii, 1);
                        ii--;
                        
                    }
                }
            }
        }
        for (x of e){
            newarr3.push([x.start, "start", x.pid, []], [x.end, "end", x.pid, []])
        }
    });

    // count 
    let counter = 0;
    let result = [];
    var glob = [];
    newarr3.sort((a, b) => a[0]-b[0]);
    for (x of newarr3){
        if (x[1] == "start"){
            counter++;
            glob.push(x[2]);
        }
        else{
            counter--;
            glob.splice(glob.indexOf(x[2]), 1);
        }
        // result
        x.push(counter);
        glob.forEach((e) => {x[3].push(e)})
        let d = new Date(0, 0, 0, Math.floor(x[0]/100), x[0]%100);
        d.setMinutes(d.getMinutes() + time);
        let newtime = d.getHours()*100 + d.getMinutes();
        if (newtime < ed){
            result.push([[x[0], newtime], "line", 420]);
        }
    }
    result.sort((a, b) => a[0]-b[0]);
    console.log(result)
    let result2 = []
    for (x of result){
        let res = {}
        let temp = newarr3.filter((e) => {
            return e[0] >= x[0][0] && e[0] < x[0][1]
        })
        temp.sort((a, b) => a[4]-b[4]);
        res["max"] = temp[0][4];
        res["pID"] = temp[0][3];
        res["start"] = x[0][0];
        res["end"] = x[0][1];
        result2.push(res)
    }
    result2.sort((a, b) => b.max-a.max)
    console.log(result2)
    return result2[0];
}

let listhing = [
    new avail(1, 1, 1, 1020, 1600), // 1 [[1020, 1600]];
    new avail(1, 2, 2, 0900, 1200), // 2 [[0900, 1200], [1500, 1600]];
    new avail(1, 3, 2, 1100, 1600),
    new avail(1, 4, 3, 0800, 1100), // 3 [[0800, 1100], [1340, 1700]];
    new avail(1, 5, 3, 1340, 1700),
    new avail(1, 6, 4, 0900, 1200), // 4 [[0900, 1200], [1300, 1700]];
    new avail(1, 7, 4, 1300, 1700),
    new avail(1, 8, 5, 1220, 1600), // 5 [[1220, 1600], [0920, 1300], [1100, 1710]];
    new avail(1, 9, 5, 0920, 1300),
    new avail(1, 10, 5, 1100, 1710),
    new avail(1, 10, 5, 1200, 1300)
];

let newlist = [
    new avail(1110000001, 1000000001, 1100000001, 1000, 1045),
    new avail(1110000001, 1000000002, 1100000001, 1030, 1100),
    new avail(1110000001, 1000000003, 1100000002, 1030, 1115),
    new avail(1110000001, 1000000004, 1100000002, 1100, 1130),
    new avail(1110000002, 1000000005, 1100000001, 1000, 1100),
    new avail(1110000002, 1000000006, 1100000002, 1100, 1200),
    new avail(1110000002, 1000000007, 1100000003, 1200, 1300),
    new avail(1110000003, 1000000008, 1100000004, 1000, 1100),
    new avail(1110000003, 1000000009, 1100000005, 1045, 1230),
    new avail(1110000003, 1000000010, 1100000006, 1030, 1200),
    new avail(1110000003, 1000000011, 1100000007, 1100, 1500),
    new avail(1110000004, 1000000012, 1100000008, 1000, 1100),
    new avail(1110000004, 1000000013, 1100000009, 1045, 1230),
    new avail(1110000004, 1000000014, 1100000010, 1030, 1200),
    new avail(1110000004, 1000000015, 1100000011, 1100, 1500),
    new avail(1110000004, 1000000016, 1100000012, 1600, 1700)
] 

console.log(find(newlist, 1110000001, 30, 0, 2359));
//console.log(find(newlist, 1110000002, 60, 0, 2359));
//console.log(find(newlist, 1110000003, 15, 0, 2359));
//console.log(find(newlist, 1110000004, 15, 0, 2359));
