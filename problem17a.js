const fs = require('fs');

const data = fs.readFileSync('input17.txt', 'utf8');
// const data = `
// .#.
// ..#
// ###
// `;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);
let cubes = {};
let y = 0;
for (const line of lines) {
  let x = 0;
  for (const char of line.split('')) {
    if (char === '#') {
      cubes[`${x}:${y}:${0}`] = true;
    }
    x++;
  }
  y++;
}

console.log(cubes);

for (let i = 0; (i < 6); i++) {
  const newCubes = {};
  const considered = {};
  const coords = Object.keys(cubes).map(key => key.split(':'));
  const minX = Math.min(...coords.map(coords => coords[0]));
  const minY = Math.min(...coords.map(coords => coords[1]));
  const minZ = Math.min(...coords.map(coords => coords[2]));
  const maxX = Math.max(...coords.map(coords => coords[0]));
  const maxY = Math.max(...coords.map(coords => coords[1]));
  const maxZ = Math.max(...coords.map(coords => coords[2]));
  console.log(minX, maxX, minY, maxY, minZ, maxZ);
  // Allow for growth at the edge
  for (z = minZ - 1; (z <= maxZ + 1); z++) {
    for (y = minY - 1; (y <= maxY + 1); y++) {
      for (x = minX - 1; (x <= maxX + 1); x++) {
        consider(x, y, z);
      }
    }
  }
  function consider(x, y, z) {
    let neighbors = 0;
    const live = cubes[`${x}:${y}:${z}`];
    for (let nz = z - 1; (nz <= z + 1); nz++) {
      for (let ny = y - 1; (ny <= y + 1); ny++) {
        for (let nx = x - 1; (nx <= x + 1); nx++) {
          if (!((nx === x) && (ny === y) && (nz === z))) {
            if (cubes[`${nx}:${ny}:${nz}`]) {
              neighbors++;
            }
          }
        }
      }
    }
    if (live) {
      if ((neighbors === 2) || (neighbors === 3)) {
        newCubes[`${x}:${y}:${z}`] = true;
      }
    } else if (neighbors === 3) {
      newCubes[`${x}:${y}:${z}`] = true;
    }
  }
  console.log(newCubes);
  cubes = newCubes;
}

console.log(cubes);
console.log(Object.keys(cubes).length);