const EPSILON = 1e-6

function compare_double(a, b) {
  return Math.abs(a - b) < EPSILON
}

module.exports = {EPSILON, compare_double}
