import fs from "fs";
import readline from "readline";

function isResultPossibleWithAppend(
  currentValue,
  remainingNumbers,
  targetResult
) {
  if (remainingNumbers === null) {
    return currentValue === targetResult;
  }

  const nextValue = parseInt(remainingNumbers[0]);
  const nextRemainingNumbers =
    remainingNumbers.length > 1 ? remainingNumbers.slice(1) : null;

  return (
    isResultPossibleWithAppend(
      currentValue + nextValue,
      nextRemainingNumbers,
      targetResult
    ) ||
    isResultPossibleWithAppend(
      currentValue * nextValue,
      nextRemainingNumbers,
      targetResult
    ) ||
    isResultPossibleWithAppend(
      parseInt(currentValue + "" + nextValue),
      nextRemainingNumbers,
      targetResult
    )
  );
}

function isResultPossible(currentValue, remainingNumbers, targetResult) {
  // console.log(currentValue);
  if (remainingNumbers === null) {
    return currentValue === targetResult;
  }

  const nextValue = parseInt(remainingNumbers[0]);
  const nextRemainingNumbers =
    remainingNumbers.length > 1 ? remainingNumbers.slice(1) : null;

  return (
    isResultPossible(
      currentValue + nextValue,
      nextRemainingNumbers,
      targetResult
    ) ||
    isResultPossible(
      currentValue * nextValue,
      nextRemainingNumbers,
      targetResult
    )
  );
}

function calculatePartOne(lines) {
  let sum = 0;
  for (const line of lines) {
    const splitLine = line.split(": ");
    const result = parseInt(splitLine[0]);
    const numbers = splitLine[1].split(" ");
    if (isResultPossible(parseInt(numbers[0]), numbers.slice(1), result)) {
      sum += result;
    }
  }

  return sum;
}

function calculatePartTwo(lines) {
  let sum = 0;
  for (const line of lines) {
    const splitLine = line.split(": ");
    const result = parseInt(splitLine[0]);
    const numbers = splitLine[1].split(" ");
    if (
      isResultPossibleWithAppend(parseInt(numbers[0]), numbers.slice(1), result)
    ) {
      sum += result;
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
    console.log(
      "Part 1 total calibration result: " + calculatePartOne([...lines])
    );
    console.log("Part 2 distinct positions: " + calculatePartTwo([...lines]));
  });
}

main();
