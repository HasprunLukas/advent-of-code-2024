import fs from "fs";
import readline from "readline";

function isReportSafe(line) {
  let isIncreasing = null;

  for (let i = 1; i < line.length; i++) {
    let diff = line[i] - line[i - 1];

    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
      return false;
    }

    if (isIncreasing === null) {
      isIncreasing = diff > 0;
    } else if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
      return false;
    }
  }
  return true;
}

function isReportSafeWithToleration(line) {
  for (let skipIndex = 0; skipIndex < line.length; skipIndex++) {
    let isIncreasing = null;
    let isSafe = true;

    for (let i = 1; i < line.length; i++) {
      if (i === skipIndex) continue;

      let prev = i - 1 === skipIndex ? line[i - 2] : line[i - 1];
      if (prev === undefined) continue;

      let diff = line[i] - prev;

      if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
        isSafe = false;
        break;
      }

      if (isIncreasing === null) {
        isIncreasing = diff > 0;
      } else if ((isIncreasing && diff < 0) || (!isIncreasing && diff > 0)) {
        isSafe = false;
        break;
      }
    }

    if (isSafe) return true;
  }

  return false;
}

function calculatePartOne(lines) {
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    if (isReportSafe(lines[i].split(" "))) {
      sum += 1;
    }
  }

  return sum;
}

function calculatePartTwo(lines) {
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    if (isReportSafeWithToleration(lines[i].split(" "))) {
      sum += 1;
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
    console.log("Part 1 safe reports: " + calculatePartOne([...lines]));
    console.log("Part 2 safe reports: " + calculatePartTwo([...lines]));
  });
}

main();
