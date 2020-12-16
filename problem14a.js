const fs = require('fs');

const data = fs.readFileSync('input14.txt', 'utf8');
// const data = `
// mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
// mem[8] = 11
// mem[7] = 101
// mem[8] = 0`;

const program = data.split('\n').map(line => line.trim()).filter(line => line.length).map(line => line.split(' = '));

const memory = [];
let andWith = 0n;
let orWith = 0n;
let sum = 0n;
let mask;

for (instruction of program) {
  if (instruction[0] === 'mask') {
    let bit = 1n;
    mask = instruction[1];
    andWith = 0n;
    orWith = 0n;
    for (let i = mask.length - 1; (i >= 0); i--) {
      const c = mask.charAt(i);
      if (c === 'X') {
        // Leave this bit
        andWith += bit;
      } else if (c === '1') {
        // Override this bit
        orWith += bit;
      } else if (c === '0') {
        // Drop this bit
      }
      bit <<= 1n;
    }
  } else if (instruction[0].startsWith('mem')) {
    let [ dummy, index ] = instruction[0].match(/^mem\[(\d+)\]$/);
    const value = BigInt(instruction[1]);
    console.log(value);
    console.log(`>${value.toString(2).padStart(36, '0')}`);
    console.log(`#${mask}#`);
    index = parseInt(index);
    memory[index] = (value & andWith) | orWith;
    console.log(`<${memory[index].toString(2)}`);
  }
}

// console.log(memory);
for (const value of memory) {
  if ((typeof value) === 'bigint') {
    sum += value;
  }
}
console.log(sum);
