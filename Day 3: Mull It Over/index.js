import fs from "fs";
import readline from "readline";

function calculatePartOne(lines) {
  let sum = 0;
  for (let line of lines) {
    line.match(/mul\(\d+,\d+\)/g).forEach((element) => {
      let numbers = element.replace(/[mul()]/g, "").split(",");
      sum += numbers[0] * numbers[1];
    });
  }

  return sum;
}

function calculatePartTwo(lines) {
  let sum = 0;
  let isEnabled = true;
  for (let line of lines) {
    line.match(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g).forEach((element) => {
      let text = element.replace(/[mul()]/g, "");
      if (text === "do") {
        isEnabled = true;
      } else if (text === "don't") {
        isEnabled = false;
      } else if (isEnabled) {
        let numbers = element.replace(/[mul()]/g, "").split(",");
        sum += numbers[0] * numbers[1];
      }
    });
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
