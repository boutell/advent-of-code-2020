const data = [ 13,16,0,12,15,1 ];

const turns = 30000000;
const previousBuffer = new ArrayBuffer(turns * 4);
const previous = new Int32Array(previousBuffer);
const lastBuffer = new ArrayBuffer(turns * 4);
const last = new Int32Array(lastBuffer);
// const previous = [];
// const last = [];
for (let i = 0; (i < turns); i++) {
  previous[i] = -1;
  last[i] = -1;
}

let latest;

for (let turn = 0; (turn < turns); turn++) {
  if (data.length) {
    latest = data.shift();
  } else if (previous[latest] >= 0) {
    // console.log(`>> ${latest} ${previous[latest]}`);
    latest = turn - 1 - previous[latest];
  } else {
    latest = 0;
  }
  previous[latest] = last[latest];
  last[latest] = turn;
  // console.log(`${turn} ${latest} ${last[latest]}`);
}
console.log(latest);
