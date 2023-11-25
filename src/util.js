const EPSILON = 1e-4

function compare_double(a, b) {
  return Math.abs(a - b) < EPSILON
}

export {EPSILON, compare_double}
