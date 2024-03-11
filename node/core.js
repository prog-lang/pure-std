const id = (x) => x;
const first = (x) => (_) => x;
const second = (_) => (y) => y;
const flip = (f) => (y) => (x) => f(x)(y);
const compose = (f) => (g) => (x) => g(f(x));

module.exports = {
  id,
  first,
  second,
  flip,
  compose,
};
