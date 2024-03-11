const { id, flip, first, compose } = require("./core");

const Type$Maybe = "Maybe";
const Tag$Maybe$None = "None";
const Tag$Maybe$Some = "Some";

const None = { type: Type$Maybe, tag: Tag$Maybe$None };
const Some = (x) => ({ type: Type$Maybe, tag: Tag$Maybe$Some, value: x });

const isNone = (m) => m.tag === Tag$Maybe$None;
const isSome = (m) => m.tag === Tag$Maybe$Some;

const maybe = (x) => (f) => (m) => isSome(m) ? f(m.value) : x;
const unwrap = (x) => (m) => maybe(x)(id)(m);

const somes = (ms) => ms.filter(isSome).map(unwrap(null));
// ?                                               ^^^^
// ?                                 This default value will never be used

const Default$Maybe$default = None;

const Map$Maybe$map = (f) => (m) => maybe(None)(compose(f)(Some))(m);
const Map$Maybe$swap = (x) => Map$Maybe$map(first(x));

const Fold$Maybe$foldl = (f) => (x) => (m) => maybe(x)(f(x))(m);
const Fold$Maybe$foldr = (f) => Fold$Maybe$foldl(flip(f));
const Fold$Maybe$null = (m) => isNone(m);
const Fold$Maybe$list = (m) => (isSome(m) ? [m.value] : []);
const Fold$Maybe$len = (m) => Fold$Maybe$list(m).length;

module.exports = {
  None,
  Some,
  isNone,
  isSome,
  maybe,
  unwrap,
  somes,
  Default$Maybe$default,
  Map$Maybe$map,
  Map$Maybe$swap,
  Fold$Maybe$foldl,
  Fold$Maybe$foldr,
  Fold$Maybe$null,
  Fold$Maybe$len,
  Fold$Maybe$list,
};
