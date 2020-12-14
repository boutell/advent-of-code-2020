const fs = require('fs');
const data = fs.readFileSync('input8.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length);
const program = data.map(line => {
  const [ dummy, opcode, value ] = line.match(/^(\w+) ([+-]\d+)/);
  return { opcode, value: parseInt(value) };
});

const visited = [];
let acc = 0;
let pc = 0;

while (true) {
  if (visited[pc]) {
    console.log(acc);
    break;
  }
  visited[pc] = true;
  switch (program[pc].opcode) {
    case 'nop':
      pc++;
      break;
    case 'acc':
      acc += program[pc].value;
      pc++;
      break;
    case 'jmp':
      pc += program[pc].value;
      break;
  }
}
