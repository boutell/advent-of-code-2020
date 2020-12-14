const fs = require('fs');

let room = fs.readFileSync('input11.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length).map(s => s.split(''));

let rounds = 0;
let occupied;

while (true) {
  let changed = false;
  occupied = 0;
  const next = [];
  for (let y = 0; (y < room.length); y++) {
    const row = [];
    for (let x = 0; (x < room[y].length); x++) {
      let neighbors = 0;
      for (yi = y - 1; (yi <= y + 1); yi++) {
        for (xi = x - 1; (xi <= x + 1); xi++) {
          if ((yi < 0) || (yi >= room.length) || (xi < 0) || (xi >= room[0].length)) {
            continue;
          }
          if ((xi === x) && (yi === y)) {
            continue;
          }
          if (room[yi][xi] === '#') {
            neighbors++;
          }
        }
      }
      if (room[y][x] === '#') {
        if (neighbors >= 4) {
          row.push('L');
          changed = true;
        } else {
          row.push('#');
          occupied++;
        }
      } else if (room[y][x] === 'L') {
        if (!neighbors) {
          row.push('#');
          occupied++;
          changed = true;
        } else {
          row.push('L');
        }
      } else {
        row.push('.');
      }
    }
    next.push(row);
  }
  room = next;
  rounds++;
  if (!changed) {
    break;
  }
}

console.log(rounds, occupied);
