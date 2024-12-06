import fs from "fs";
import readline from "readline";

function calculatePartOne(lines) {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      let curr = lines[i][j];
      if (curr === "X") {
        // horizontal SAMX
        if (
          j - 3 >= 0 &&
          lines[i][j - 1] === "M" &&
          lines[i][j - 2] === "A" &&
          lines[i][j - 3] === "S"
        ) {
          sum += 1;
        }
        // horizontal XMAS
        if (
          j + 3 < lines[i].length &&
          lines[i][j + 1] === "M" &&
          lines[i][j + 2] === "A" &&
          lines[i][j + 3] === "S"
        ) {
          sum += 1;
        }
        // vertical SAMX
        if (
          i - 3 >= 0 &&
          lines[i - 1][j] === "M" &&
          lines[i - 2][j] === "A" &&
          lines[i - 3][j] === "S"
        ) {
          sum += 1;
        }
        // vertical XMAS
        if (
          i + 3 < lines.length &&
          lines[i + 1][j] === "M" &&
          lines[i + 2][j] === "A" &&
          lines[i + 3][j] === "S"
        ) {
          sum += 1;
        }
        // right diagonal SAMX
        if (
          i - 3 >= 0 &&
          j + 3 < lines[i].length &&
          lines[i - 1][j + 1] === "M" &&
          lines[i - 2][j + 2] === "A" &&
          lines[i - 3][j + 3] === "S"
        ) {
          sum += 1;
        }
        // right diagonal XMAS
        if (
          i + 3 < lines.length &&
          j + 3 < lines[i].length &&
          lines[i + 1][j + 1] === "M" &&
          lines[i + 2][j + 2] === "A" &&
          lines[i + 3][j + 3] === "S"
        ) {
          sum += 1;
        }
        // left diagonal SAMX
        if (
          i - 3 >= 0 &&
          j - 3 >= 0 &&
          lines[i - 1][j - 1] === "M" &&
          lines[i - 2][j - 2] === "A" &&
          lines[i - 3][j - 3] === "S"
        ) {
          sum += 1;
        }
        // left diagonal XMAS
        if (
          i + 3 < lines.length &&
          j - 3 >= 0 &&
          lines[i + 1][j - 1] === "M" &&
          lines[i + 2][j - 2] === "A" &&
          lines[i + 3][j - 3] === "S"
        ) {
          sum += 1;
        }
      }
    }
  }
  return sum;
}

function calculatePartTwo(lines) {
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      let curr = lines[i][j];
      if (curr === "M") {
        if (j + 2 < lines[i].length && lines[i][j + 2] === "M") {
          if (
            i + 2 < lines.length &&
            lines[i + 1][j + 1] === "A" &&
            lines[i + 2][j + 2] === "S" &&
            lines[i + 2][j] === "S"
          ) {
            sum += 1;
          }
        } else if (j + 2 < lines[i].length && lines[i][j + 2] === "S") {
          if (
            i + 2 < lines.length &&
            lines[i + 1][j + 1] === "A" &&
            lines[i + 2][j + 2] === "S" &&
            lines[i + 2][j] === "M"
          ) {
            sum += 1;
          }
        }
      } else if (curr === "S") {
        if (j + 2 < lines[i].length && lines[i][j + 2] === "M") {
          if (
            i + 2 < lines.length &&
            lines[i + 1][j + 1] === "A" &&
            lines[i + 2][j + 2] === "M" &&
            lines[i + 2][j] === "S"
          ) {
            sum += 1;
          }
        } else if (j + 2 < lines[i].length && lines[i][j + 2] === "S") {
          if (
            i + 2 < lines.length &&
            lines[i + 1][j + 1] === "A" &&
            lines[i + 2][j + 2] === "M" &&
            lines[i + 2][j] === "M"
          ) {
            sum += 1;
          }
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
    console.log("Part 1 XMAS count: " + calculatePartOne([...lines]));
    console.log("Part 2 X-MAS count: " + calculatePartTwo([...lines]));
  });
}

main();
