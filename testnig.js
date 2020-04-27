let d = new Date(0, 0, 0, Math.floor(1236/100), 1236%100)
let e = d + 33333333
d.setMinutes(d.getMinutes() + 60)
console.log(d.getMinutes())
console.log(e.toString())
console.log([1,2,3,4,5][-1])
console.log(d.getHours()*100 + d.getMinutes())
//console.log(new Date().setMinutes(new Date(0, 0, 0, Math.floor(1230/100), 1230%100).getMinutes() + 60).toDateString())