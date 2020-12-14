const fs = require('fs');
const adapters = fs.readFileSync('input10.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line.length).map(s => parseInt(s));
adapters.sort((a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
});
adapters.push(adapters[adapters.length - 1] + 3);
const differences = [ 0, 0, 0, 0 ];
differences[adapters[0]]++;
for (i = 1; (i < adapters.length); i++) {
  differences[adapters[i] - adapters[i - 1]]++;
}
console.log(differences[1] * differences[3]);
