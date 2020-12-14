const fs = require('fs');
const data = fs.readFileSync('input4.txt', 'utf8').split('\n').map(line => line.trim());
let passports = [];
let passport = {};
const fields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid' ];
for (const row of data) {
  if (!row.length) {
    passports.push(passport);
    passport = {};
    continue;
  }
  const clauses = row.split(' ');
  for (clause of clauses) {
    const [ dummy, name, value ] = clause.match(/^(\w+):(.*)$/);
    passport[name] = value;
  }
}
if (Object.keys(passport).length) {
  passports.push(passport);
}

let valid = 0;
for (const passport of passports) {
  const length = Object.keys(passport).length;
  if ((length === 8) || ((length === 7) && (passport.cid === undefined))) {
    valid++;
  }
}
console.log(valid);