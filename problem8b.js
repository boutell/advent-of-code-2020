const fs = require('fs');
const data = fs.readFileSync('input8.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length);
const program = data.map(line => {
  const [ dummy, opcode, value ] = line.match(/^(\w+) ([+-]\d+)/);
  return { opcode, value: parseInt(value) };
});

console.log(solve());

function solve() {
  let poked = -1;
  while(true) {
    console.log(poked);
    for (let poke = poked + 1; (poke < program.length); poke++) {
      if (program[poke].opcode === 'jmp') {
        program[poke].opcode = 'nop';
        poked = poke;
        break;
      }
    }
    const visited = [];
    let acc = 0;
    let pc = 0;
    while (true) {
      if (pc === program.length) {
        return acc;
      }
      if (visited[pc]) {
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
    if (poked >= 0) {
      program[poked].opcode = 'jmp';
    }
  }
}
