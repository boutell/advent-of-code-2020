const data = [ 1, 3, 2 ];

const turns = 2020;
// const previousBuffer = new ArrayBuffer(turns * 4);
// const previous = new Uint32Array(previousBuffer);
// const lastBuffer = new ArrayBuffer(turns * 4);
// const last = new Uint32Array(lastBuffer);
const previous = [];
const last = [];
let latest;

for (let turn = 0; (turn < turns); turn++) {
  // if (!(turn % 1000)) {
    console.log(`${turn}: ${latest}`);
  // }
  if (data.length) {
    latest = data.shift();
  } else if (previous[latest] !== undefined) {
    latest = turn - 1 - previous[latest];
  } else {
    latest = 0;
  }
  previous[latest] = last[latest];
  last[latest] = turn;
}
console.log(latest);
