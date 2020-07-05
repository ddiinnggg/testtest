class avail{
    constructor(meetID, availID, personID, start, end){
        this.meetID = meetID;
        this.aid = availID;
        this.pid = personID;
        this.start = start;
        this.end = end;
    }
}
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
];

function find(arr, mid, time, st, ed){
    ava = {};
    // clean and split by person id
    for (x of arr){
        if (x.start >= ed || x.end <= st || x.meetID != mid) continue;
        if (x.start < st) x.start = st;
        if (x.end > ed) x.end = ed;
        if (Object.keys(ava).indexOf(x.pid.toString()) == -1) ava[x.pid] = [];
        ava[x.pid].push(x);
    }
    // merge intervals that overlap / remove unneeeded ones and format 
    newarr = [];
    for (x of Object.keys(ava)){
        ava[x].sort((a, b) => a.start - b.start);
        for (let i = 1; i < ava[x].length; i++){
            if (ava[x][i].end <= ava[x][i-1].end) {
                ava[x].splice(i, 1);
                i--;
            }
            else if (ava[x][i].start <= ava[x][i-1].end) {
                ava[x][i].start = ava[x][i-1].start;
                ava[x].splice(i-1, 1);
                i--;
            }
        }
        newarr.push(ava[x].map(e => [["start", e["start"], e["pid"]], ["end", e["end"], e["pid"]]]))
    }
    // count and keep pids
    let counter = 0;
    let pids = [];
    newarr = newarr.flat(2);
    newarr.sort((a, b) => a[1] - b[1]);
    for (x of newarr) {
        if (x[0] == "start") {
            counter++;
            pids.push(x[2]);
        }
        else {
            counter--;
            pids.splice(pids.indexOf(x[2]), 1);
        }
        x.push(counter);
        x.push(pids.concat());
    }
    // search duration after each start event
    results = []
    for (x of newarr.filter(e => e[0] == "start").map(e => e[1])){
        let etime = new Date(0, 0, 0, Math.floor(x/100), x%100);
        etime.setMinutes(etime.getMinutes() + time);
        etime = etime.getHours()*100 + etime.getMinutes();
        let temp = newarr.filter(e => e[1] >= x && e[1] < etime);
        temp.sort((a, b) => a[3]-b[3]);
        res = {}
        res["max"] = temp[0][3];
        res["pid"] = temp[0][4];
        res["start"] = x;
        res["end"] = etime;
        results.push(res);
    }
    results.sort((a, b) => b["max"]-a["max"]);
    return results;
}


console.log(find(newlist, 1110000001, 30, 0, 2359));
console.log(find(newlist, 1110000002, 60, 0, 2359));
console.log(find(newlist, 1110000003, 15, 0, 2359));
console.log(find(newlist, 1110000004, 15, 0, 2359));