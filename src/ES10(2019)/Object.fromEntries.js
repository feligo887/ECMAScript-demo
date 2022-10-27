const obj = {
    name: 'imooc',
    course: 'es'
}
const entries = Object.entries(obj)
console.log('entries: ', entries);

// ES10
const fromEntries = Object.fromEntries(entries)
console.log('fromEntries: ', fromEntries);

// map -> 对象
const map = new Map()
map.set('name', 'imooc')
map.set('course', 'es')
console.log('map: ', map);
const mapEntries = Object.fromEntries(map)
console.log('mapEntries: ', mapEntries);


let arr = [1,2,3]
arr = Object.entries(arr);
arr = Object.fromEntries(arr);
console.log('Object.fromEntries(arr): ', arr );