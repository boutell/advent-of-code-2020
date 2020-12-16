const data = [ 1, 2, 3 ];

const previous = {};
const last = {};
let latest;
console.log(last);

for (let turn = 0; (turn < 2020); turn++) {
  if (data.length) {
    latest = data.shift();
  } else if (previous[latest] !== undefined) {
    latest = turn - 1 - previous[latest];
  } else {
    latest = 0;
  }
  previous[latest] = last[latest];
  last[latest] = turn;
  console.log(latest);
}
