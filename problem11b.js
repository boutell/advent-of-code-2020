const fs = require('fs');

const data = fs.readFileSync('input11.txt', 'utf8');
// const data = `
// L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
// `;
let room = data.split('\n').map(line => line.trim()).filter(line => line.length).map(s => s.split(''));

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
      const angles = [
        [ 0, -1 ],
        [ 1, -1 ],
        [ 1, 0 ],
        [ 1, 1 ],
        [ 0, 1 ],
        [ -1, 1 ],
        [ -1, 0 ],
        [ -1, -1 ]
      ];
      for (const angle of angles) {
        let yi = y;
        let xi = x;
        while (true) {
          yi += angle[1];
          xi += angle[0];
          if ((yi < 0) || (yi >= room.length) || (xi < 0) || (xi >= room[0].length)) {
            break;
          }
          if (room[yi][xi] === '#') {
            neighbors++;
            break;
          } else if (room[yi][xi] === 'L') {
            // Blocked view
            break;
          }
        }
      }
      if (room[y][x] === '#') {
        if (neighbors >= 5) {
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
  console.log(rounds);
  for (const row of room) {
    console.log(row.join(''));
  }
  if (!changed) {
    break;
  }
}

console.log(rounds, occupied);
