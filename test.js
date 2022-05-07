const results = {
  "wallet1": 10,
  "wallet2": 1,
  "wallet3": 5,
  "wallet4": 100,
}

const sorted = Object.entries(results).sort((a, b) => (a[1] < b[1]) ? 1 : -1);

console.dir(sorted);
