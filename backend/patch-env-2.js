import fs from 'fs'
const p = 'src/config/index.js'
let t = fs.readFileSync(p, 'utf8')
const old = "dotenv.config({ path: path.resolve(__dirname, '../../.env') })\n\nconst config = {\n"
const ne = "dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true })\n\nconst config = {\n"
if (!t.includes(old)) {
  console.error('Pattern not found')
  process.exit(1)
}
fs.writeFileSync(p, t.replace(old, ne), 'utf8')
console.log('updated')
