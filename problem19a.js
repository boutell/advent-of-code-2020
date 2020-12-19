const fs = require('fs');

const data = fs.readFileSync('input19.txt', 'utf8');
// const data = `
// 0: 4 1 5
// 1: 2 3 | 3 2
// 2: 4 4 | 5 5
// 3: 4 5 | 5 4
// 4: "a"
// 5: "b"
// ababbb
// bababa
// abbbab
// aaabbb
// aaaabbb
// `;

// const data = `
// 0: 1 3 | 1 2
// 1: 2 3 | 3 2
// 2: "a"
// 3: "b"

// abb
// bab
// aaa
// bbb
// baa
// aba
// `;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);
const rules = {};
const inputs = [];
for (const line of lines) {
  let matches = line.match(/^(\d+): "(\w+)"$/);
  if (matches) {
    const [ dummy, index, text ] = matches;
    rules[index] = {
      type: 'text',
      value: text
    };
  } else {
    matches = line.match(/^(\d+): (.*)$/);
    if (matches) {
      const [ dummy, index, body ] = matches;
      const sets = body.split(' | ').map(s => s.split(' '));
      rules[index] = {
        type: 'sets',
        value: sets
      };
    } else {
      inputs.push(line);
    }
  }
}

let good = 0;
for (const input of inputs) {
  const tokens = input.split('');
  let offset = 0;
  try {
    parse('0');
    if (offset < tokens.length) {
      throw 'unexpected characters';
    }
    good++;
    console.log(`Yes: ${input}`);
  } catch (e) {
    // Nope
  }
  function parse(index) {
    // console.log(`<< ${JSON.stringify(rules[index], null, '  ')}\n ${tokens} >>`);
    const rule = rules[index];
    if (rule.type === 'text') {
      expect(rule.value);
    } else {
      let good = false;
      for (const set of rule.value) {
        let offsetWas = offset;
        try {
          for (const index of set) {
            parse(index);
          }
          good = true;
          break;
        } catch (e) {
          // console.log(e);
          offset = offsetWas;
          continue;
        }
      }
      if (good) {
        // console.log(`OK for ${JSON.stringify(rules[index], null, '  ')}`);
        return;
      }
      // console.log(`throwing for ${JSON.stringify(rules[index], null, '  ')}`);
      throw 'Invalid set';
    }
  }
  function accept(...options) {
    const token = tokens[offset];
    if (!token) {
      return false;
    }
    for (const option of options) {
      if (token === option) {
        consume();
        return token;
      }
      if ((option === 'number') && ((typeof token) === option)) {
        consume();
        return { number: token };
      }
    }
    return false;
  }
  function expect(option) {
    const result = accept(option);
    if (!result) {
      throw `Expected ${option}`;
    }
    return result;
  }
  function consume() {
    offset++;
  }
}

console.log(good);