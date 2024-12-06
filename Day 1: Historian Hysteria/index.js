import fs from "fs";
import readline from "readline";

function sortNumbers(a, b) {
  return a - b;
}

function calculatePartOne(firstColumn, secondColumn) {
  firstColumn = firstColumn.sort(sortNumbers);
  secondColumn = secondColumn.sort(sortNumbers);

  let sum = 0;
  while (firstColumn.length > 0) {
    sum += Math.abs(firstColumn.shift() - secondColumn.shift());
  }

  return sum;
}

function calculatePartTwo(firstColumn, secondColumn) {
  let sum = 0;

  while (firstColumn.length > 0) {
    let number = firstColumn.shift();
    sum += number * secondColumn.filter((item) => item === number).length;
  }

  return sum;
}

function main() {
  let firstColumn = [];
  let secondColumn = [];

  const fileStream = fs.createReadStream("./input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    let numbers = line.split(" ").filter(Number);
    // console.log("Line: " + numbers);
    firstColumn.push(numbers[0]);
    secondColumn.push(numbers[1]);
  });

  rl.on("close", () => {
    firstColumn = firstColumn.sort(sortNumbers);
    secondColumn = secondColumn.sort(sortNumbers);

    console.log("Finished reading.");
    console.log(
      "Part 1 distance is: " +
        calculatePartOne([...firstColumn], [...secondColumn])
    );
    console.log(
      "Part 2 similarity score is: " +
        calculatePartTwo([...firstColumn], [...secondColumn])
    );
  });
}

main();
