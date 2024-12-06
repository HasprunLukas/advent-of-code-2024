import fs from "fs";
import readline from "readline";
import Guard from "./guard.js";

function getGuardsPosition(lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "^") {
        return [i, j];
      }
    }
  }
}

function create2dArray(height, width) {
  const arr = [];
  for (let i = 0; i < height; i++) {
    arr[i] = [];
    for (let j = 0; j < width; j++) {
      arr[i][j] = 0;
    }
  }

  return arr;
}

function calculatePartOne(lines) {
  let sum = 0;
  let guardPosition = getGuardsPosition(lines);
  let isAway = false;
  let direction = 0;
  const visitedArr = create2dArray(lines.length, lines[0].length);
  visitedArr[guardPosition[0]][guardPosition[1]] = 1;
  while (!isAway) {
    if (direction === 0) {
      if (guardPosition[0] - 1 < 0) {
        isAway = true;
      } else if (lines[guardPosition[0] - 1][guardPosition[1]] === "#") {
        direction += 90;
      } else {
        guardPosition[0] -= 1;
      }
    } else if (direction === 90) {
      if (guardPosition[1] + 1 >= lines[0].length) {
        isAway = true;
      } else if (lines[guardPosition[0]][guardPosition[1] + 1] === "#") {
        direction += 90;
      } else {
        guardPosition[1] += 1;
      }
    } else if (direction === 180) {
      if (guardPosition[0] + 1 >= lines.length) {
        isAway = true;
      } else if (lines[guardPosition[0] + 1][guardPosition[1]] === "#") {
        direction += 90;
      } else {
        guardPosition[0] += 1;
      }
    } else if (direction === 270) {
      if (guardPosition[1] - 1 < 0) {
        isAway = true;
      } else if (lines[guardPosition[0]][guardPosition[1] - 1] === "#") {
        direction += 90;
      } else {
        guardPosition[1] -= 1;
      }
    }

    if (direction > 270) {
      direction = 0;
    }

    if (!isAway) {
      visitedArr[guardPosition[0]][guardPosition[1]] = 1;
    }
  }
  sum = visitedArr.flat().filter((element) => element === 1).length;

  return sum;
}

function copy2dArray(arr) {
  const copy = [];
  for (let i = 0; i < arr.length; i++) {
    copy[i] = [];
    for (let j = 0; j < arr[0].length; j++) {
      copy[i][j] = arr[i][j];
    }
  }

  return copy;
}

function isInLoop(lines) {
  const visited = new Set();
  let guardPosition = getGuardsPosition(lines);
  let isAway = false;
  let direction = 0;

  while (!isAway) {
    const positionKey = `${guardPosition[0]},${guardPosition[1]},${direction}`;
    if (visited.has(positionKey)) {
      return true;
    }
    visited.add(positionKey);

    if (direction === 0) {
      if (guardPosition[0] - 1 < 0) {
        isAway = true;
      } else if (lines[guardPosition[0] - 1][guardPosition[1]] === "#") {
        direction += 90;
      } else {
        guardPosition[0] -= 1;
      }
    } else if (direction === 90) {
      if (guardPosition[1] + 1 >= lines[0].length) {
        isAway = true;
      } else if (lines[guardPosition[0]][guardPosition[1] + 1] === "#") {
        direction += 90;
      } else {
        guardPosition[1] += 1;
      }
    } else if (direction === 180) {
      if (guardPosition[0] + 1 >= lines.length) {
        isAway = true;
      } else if (lines[guardPosition[0] + 1][guardPosition[1]] === "#") {
        direction += 90;
      } else {
        guardPosition[0] += 1;
      }
    } else if (direction === 270) {
      if (guardPosition[1] - 1 < 0) {
        isAway = true;
      } else if (lines[guardPosition[0]][guardPosition[1] - 1] === "#") {
        direction += 90;
      } else {
        guardPosition[1] -= 1;
      }
    }

    if (direction > 270) {
      direction = 0;
    }
  }
  return false;
}

function calculatePartTwo(lines) {
  let sum = 0;

  // Convert strings to arrays of characters
  const linesAsArray = lines.map((line) => line.split(""));

  const guardPosition = getGuardsPosition(linesAsArray);
  for (let i = 0; i < linesAsArray.length; i++) {
    for (let j = 0; j < linesAsArray[0].length; j++) {
      if (i !== guardPosition[0] || j !== guardPosition[1]) {
        let copiedLines = JSON.parse(JSON.stringify(linesAsArray));
        copiedLines[i][j] = "#"; // Modify safely
        if (isInLoop(copiedLines)) {
          sum += 1;
        }
      }
    }
  }

  return sum;
}

function main() {
  let lines = [];
  const fileStream = fs.createReadStream("./input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    lines.push(line);
  });

  rl.on("close", () => {
    console.log("Finished reading.");
    console.log("Part 1 distinct positions: " + calculatePartOne([...lines]));
    console.log("Part 2 distinct positions: " + calculatePartTwo([...lines]));
  });
}

main();
