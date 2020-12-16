const fs = require('fs');

const data = fs.readFileSync('input14.txt', 'utf8');
// const data = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1`;

const program = data.split('\n').map(line => line.trim()).filter(line => line.length).map(line => line.split(' = '));

const memory = {};
let sum = 0n;
let mask;
let exes = 0n;

for (instruction of program) {
  if (instruction[0] === 'mask') {
    exes = 0n;
    mask = instruction[1];
    console.log(mask);
    for (let i = 0; (i < mask.length); i++) {
      if (mask.charAt(i) === 'X') {
        exes++;
      }
    }
  } else if (instruction[0].startsWith('mem')) {
    let [ dummy, index ] = instruction[0].match(/^mem\[(\d+)\]$/);
    index = BigInt(index);
    const value = BigInt(instruction[1]);
    let range = 1n << exes;
    console.log(range);
    for (let i = 0n; (i < range); i++) {
      // console.log(i);
      let exBit = 1n;
      let bit = 1n;
      let andWith = 0n;
      let orWith = 0n;
      for (let j = mask.length - 1; (j >= 0); j--) {
        const c = mask.charAt(j);
        if (c === '0') {
          // Leave this bit
          andWith += bit;
        } else if (c === '1') {
          // Override this bit
          orWith += bit;
        } else if (c === 'X') {
          // Floating bit
          if (i & exBit) {
            orWith += bit;
          } else {
            // Leaving it out of both andWith and orWith zeroes it
          }
          exBit <<= 1n;
        }
        bit <<= 1n;
      }
      const effectiveIndex = (index & andWith) | orWith;
      console.log(`[${range}] ${index} ${effectiveIndex} ${andWith} ${orWith}`);
      memory[effectiveIndex] = value;
    }
  }
}

// console.log(memory);
for (const value of Object.values(memory)) {
  if ((typeof value) === 'bigint') {
    sum += value;
  }
}
console.log(sum);
