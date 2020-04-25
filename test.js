function brutefind(arr, time){
    let all = [];
    arr.forEach((e, i) => {
        e.forEach((d) => {
            d.push(i);
            all.push(d);
        })
    })
    
}

let person1 = [[1020, 1600]];
let person2 = [[0900, 1200], [1500, 1600]];
let person3 = [[0800, 1100], [1300, 1700]];
let person4 = [[0900, 1200], [1300, 1700]];

console.log(brutefind([person1, person2, person3, person4], 60));