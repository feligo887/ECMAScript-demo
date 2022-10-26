// padStart
const now = new Date()
const year = now.getFullYear()
const month = (now.getMonth() + 1).toString().padStart(2, '0') // 0~11
const day = (now.getDate()).toString().padStart(2, '0')
console.log(`${year}-${month}-${day}`)
// padStart
const tel = '13012345678'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel)

// padEnd
let timestamp = '16845137000'
timestamp.padEnd(13, '0') // 13位时间搓