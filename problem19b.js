const fs = require('fs');

const data = fs.readFileSync('input19.txt', 'utf8');
// const data = `
// 42: 9 14 | 10 1
// 9: 14 27 | 1 26
// 10: 23 14 | 28 1
// 1: "a"
// 11: 42 31
// 5: 1 14 | 15 1
// 19: 14 1 | 14 14
// 12: 24 14 | 19 1
// 16: 15 1 | 14 14
// 31: 14 17 | 1 13
// 6: 14 14 | 1 14
// 2: 1 24 | 14 4
// 0: 8 11
// 13: 14 3 | 1 12
// 15: 1 | 14
// 17: 14 2 | 1 7
// 23: 25 1 | 22 14
// 28: 16 1
// 4: 1 1
// 20: 14 14 | 1 15
// 3: 5 14 | 16 1
// 27: 1 6 | 14 18
// 14: "b"
// 21: 14 1 | 1 14
// 25: 1 1 | 1 14
// 22: 14 14
// 8: 42
// 26: 14 22 | 1 20
// 18: 15 15
// 7: 14 5 | 1 21
// 24: 14 1
// bbabbbbaabaabba
// abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
// babbbbaabbbbbabbbbbbaabaaabaaa
// aaabbbbbbaaaabaababaabababbabaaabbababababaaa
// bbbbbbbaaaabbbbaaabbabaaa
// bbbababbbbaaaaaaaabbababaaababaabab
// ababaaaaaabaaab
// ababaaaaabbbaba
// baabbaaaabbaaaababbaababb
// abbbbabbbbaaaababbbbbbaaaababb
// aaaaabbaabaaaaababaa
// aaaabbaaaabbaaa
// aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
// babaaabbbaaabaababbaabababaaab
// aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba
// `;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);
const rules = {};
const inputs = [];
let count = 0;
for (let line of lines) {
  if (line === '8: 42') {
    line = '8: 42 | 42 8';
    count++;
  }
  if (line === '11: 42 31') {
    line = '11: 42 31 | 42 11 31';
    count++;
  }
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
  const cache = {};
  try {
    if (parse('0', 0, true).length) {
      good++;
      console.log(`Yes: ${input}`);
    }
  } catch (e) {
    // Nope
  }
  function parse(index, depth, terminal) {
    const key = `${index}:${offset}:${terminal}`;
    if (cache[key] !== undefined) {
      return cache[key];
    }
    // console.log(`<< ${JSON.stringify(rules[index], null, '  ')}\n ${tokens} >>`);
    const rule = rules[index];
    if (rule.type === 'text') {
      try {
        expect(rule.value);
        if (terminal && (offset < tokens.length)) {
          return memo([]);
        }
      } catch (e) {
        return memo([]);
      }
      return memo([ offset ]);
    } else {
      let returnContinuations = [];
      for (const set of rule.value) {
        let offsetWas = offset;
        let continuations = [ offset ];
        for (let i = 0; (i < set.length); i++) {
          let nextContinuations = [];
          for (let j = 0; (j < continuations.length); j++) {
            const index = set[i];
            offset = continuations[j];
            nextContinuations = [...nextContinuations, ...parse(index, depth + 1, false) ];
          }
          continuations = [... new Set(nextContinuations)];
        }
        if (terminal) {
          continuations = continuations.filter(continuation => continuation === tokens.length);
        }
        returnContinuations = [... new Set([ ...returnContinuations, ...continuations ])];
        // if (returnContinuations.length) {
        //   console.log(JSON.stringify(returnContinuations));
        // }
        offset = offsetWas;
      }
      return memo(returnContinuations);
    }
    function memo(value) {
      cache[key] = value;
      return value;
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

console.log(`replacements: ${count}`);
console.log(good);