const array = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 0, 0],
];

// const array = [[0,0,1,0,0],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[0,0,1,0,0]]

function soulution(board) {
  let count = 0;

  function check(x, y, maxSize) {
    const left = board[y][x - 1];
    const right = board[y][x + 1];
    const top = board[y - 1][x];
    const bottom = board[y + 1][x];

    if (left * right * top * bottom === 1) {
      return true;
    } else if (left * right * top === 1 && bottom === 0 && maxSize >= 1) {
      let increasing = true;
      let beforeSize = 1;
      let step = 1;

      while (beforeSize <= maxSize) {
        const expectedNextIncreasingRow = increasing
          ? JSON.stringify(
              [1].concat(Array(2 * (beforeSize + 1) - 1).fill(0)).concat([1])
            )
          : null;
        const expectedNextDecreasingRow = !increasing
          ? JSON.stringify(
              [1].concat(Array(2 * (beforeSize - 1) + 1).fill(0)).concat([1])
            )
          : null;

        const realNextIncreasingRow = increasing
          ? JSON.stringify(
              board[y + step].slice(x - beforeSize - 1, x + beforeSize + 2)
            )
          : null;
        const realNextDecreasingRow = !increasing
          ? JSON.stringify(
              board[y + step].slice(x - beforeSize, x + beforeSize + 1)
            )
          : null;

        if (increasing && expectedNextIncreasingRow === realNextIncreasingRow) {
          if (beforeSize === maxSize) {
            increasing = false;
            step++;
          } else {
            beforeSize++;
            step++;
          }
        } else if (
          !increasing &&
          expectedNextDecreasingRow === realNextDecreasingRow
        ) {
          if (beforeSize === 1) {
            if (board[y + step + 1][x] === 1) {
              return true;
            } else {
              return false;
            }
          } else {
            beforeSize--;
            step++;
          }
        } else {
          return false;
        }
      }

      return false;
    }
    return false;
  }

  board.forEach((row, rowIndex) => {
    const boardLength = row.length;
    row.forEach((col, colIndex) => {
      const current = board[rowIndex][colIndex];
      const maxSize =
        rowIndex !== 0 && rowIndex !== boardLength - 1
          ? Math.min(
              boardLength - colIndex - Math.floor(boardLength / 2),
              colIndex - 1
            )
          : -1;

      if (maxSize >= 0 && current === 0) {
        const checked = check(colIndex, rowIndex, maxSize);
        if (checked) {
          count++;
        }
      }
    });
  });

  return count;
}

console.log(soulution(array));
