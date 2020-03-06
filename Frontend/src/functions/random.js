export const randint = (min, max = null) => {
  if (max === null) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random() * (max - min)) + min;
};

export const choice = arr => {
  return arr[Math.floor(randint(arr.length))];
};
