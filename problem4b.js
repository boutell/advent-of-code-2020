const fs = require('fs');
const data = fs.readFileSync('input4.txt', 'utf8').split('\n').map(line => line.trim());
let passports = [];
let passport = {};
const fields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid' ];

const validators = {
  byr(s) {
    if (!s.match(/^\d\d\d\d$/)) {
      return false;
    }
    let v = parseInt(s);
    return (v >= 1920) && (v <= 2002);
  },
  iyr(s) {
    if (!s.match(/^\d\d\d\d$/)) {
      return false;
    }
    let v = parseInt(s);
    return (v >= 2010) && (v <= 2020);
  },
  eyr(s) {
    if (!s.match(/^\d\d\d\d$/)) {
      return false;
    }
    let v = parseInt(s);
    return (v >= 2020) && (v <= 2030);
  },
  hgt(s) {
    const matches = s.match(/^(\d+)(cm|in)$/);
    if (!matches) {
      return false;
    }
    const [ dummy, val, unit ] = matches;
    if (unit === 'cm') {
      return (val >= 150) && (val <= 193);
    } else if (unit === 'in') {
      return (val >= 59) && (val <= 76);
    } else {
      throw new Error('Invalid unit despite regexp: ' + unit);
    }
  },
  hcl(s) {
    return s.match(/^#[0-9a-f]{6}$/);
  },
  ecl(s) {
    return [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ].includes(s);
  },
  pid(s) {
    return s.match(/^[0-9]{9}$/);
  },
  cid(s) {
    return true;
  }
};

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
    if (!Object.keys(passport).find(key => !validators[key](passport[key]))) {
      valid++;
    }
  }
}
console.log(valid);