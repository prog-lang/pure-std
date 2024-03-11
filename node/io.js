const { stdin, stdout, stderr } = process;

const print = async (s) => {
  await stdout.write(s);
  return s;
};

const println = async (s) => {
  await stdout.write(s + "\n");
  return s;
};

module.exports = {
  print,
  println,
};
