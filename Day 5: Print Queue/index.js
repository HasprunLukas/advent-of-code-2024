import fs from "fs";
import readline from "readline";
import Rule from "./rule.js";

function isUpdateValidByRules(rules, update) {
  for (let rule of rules) {
    if (update.indexOf(rule.startPage) >= update.indexOf(rule.endPage)) {
      return false;
    }
  }

  return true;
}

function sortByRules(a, b, rules) {
  for (let rule of rules) {
    if (rule.startPage === b && rule.endPage === a) {
      return 1;
    } else if (rule.startPage === a && rule.endPage === b) {
      return -1;
    }
  }
  return 0;
}

function fixInvalidUpdatesByRules(rules, update) {
  return update.sort((a, b) => sortByRules(a, b, rules));
}

function parseRules(rules) {
  let parsedRules = [];
  for (const rule of rules) {
    const splitRule = rule.split("|");
    parsedRules.push(new Rule(splitRule[0], splitRule[1]));
  }

  return parsedRules;
}

function calculatePartOne(rules, updates) {
  let sum = 0;
  let parsedRules = parseRules(rules);
  for (const update of updates) {
    const splitUpdate = update.split(",");
    let filteredRules = parsedRules.filter(
      (rule) =>
        splitUpdate.includes(rule.startPage) &&
        splitUpdate.includes(rule.endPage)
    );
    if (isUpdateValidByRules(filteredRules, splitUpdate)) {
      sum += parseInt(splitUpdate[Math.floor(splitUpdate.length / 2)]);
    }
  }
  return sum;
}

function calculatePartTwo(rules, updates) {
  let sum = 0;
  let parsedRules = parseRules(rules);
  for (const update of updates) {
    const splitUpdate = update.split(",");
    let filteredRules = parsedRules.filter(
      (rule) =>
        splitUpdate.includes(rule.startPage) &&
        splitUpdate.includes(rule.endPage)
    );
    if (!isUpdateValidByRules(filteredRules, splitUpdate)) {
      const fixedUpdate = fixInvalidUpdatesByRules(filteredRules, splitUpdate);
      sum += parseInt(fixedUpdate[Math.floor(fixedUpdate.length / 2)]);
    }
  }
  return sum;
}

function main() {
  let rules = [];
  let isUpdate = false;
  let updates = [];

  const fileStream = fs.createReadStream("./input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    if (line.trim().length === 0) {
      isUpdate = true;
    } else if (!isUpdate) {
      rules.push(line);
    } else {
      updates.push(line);
    }
  });

  rl.on("close", () => {
    console.log("Finished reading.");
    console.log(
      "Part 1 correct middle update sum: " +
        calculatePartOne([...rules], [...updates])
    );
    console.log(
      "Part 2 corrected middle update sum: " +
        calculatePartTwo([...rules], [...updates])
    );
  });
}

main();
