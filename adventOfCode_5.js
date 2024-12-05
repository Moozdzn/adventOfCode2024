const fs = require("node:fs");

const data = fs
	.readFileSync("./adventOfCode_5_input.txt", "utf8")
	.replaceAll("\r", "")
	.split("\n");

const rules = new Map();
const updates = [];

for (const line of data) {
	if (line.includes("|")) {
		const [page1, page2] = line.split("|");
		if (rules.has(page1)) {
			rules.set(page1, rules.get(page1).set(page2, true));
		} else {
			rules.set(page1, new Map([[page2, true]]));
		}
	} else if (line.length > 0) {
		updates.push(line.split(","));
	}
}

const isUpdateCorrect = (update) => {
	for (let i = 0; i < update.length; i++) {
		const page1 = update[i];
		for (let j = i + 1; j < update.length; j++) {
			const page2 = update[j];

			if (rules.has(page2) && rules.get(page2).has(page1)) {
				return false;
			}
		}
	}

	return true;
};

const countSolution = (curr, update) => {
    const middleIndex = Math.floor(update.length / 2);
    const middleValue = update[middleIndex];

    return curr + Number.parseInt(middleValue);
}

const correctlyOrdered = updates.filter(isUpdateCorrect);

// PART I
const solution = correctlyOrdered.reduce(countSolution, 0);

console.log(solution); // 5329

// PART II

const incorrectlyOrdered = updates.filter((update) => !isUpdateCorrect(update));

const swapIncorrectlyOrdered = (update) => {
	while (!isUpdateCorrect(update)) {
		for (let i = 0; i < update.length; i++) {
			const page1 = update[i];
			for (let j = i + 1; j < update.length; j++) {
				const page2 = update[j];

				if (rules.has(page2) && rules.get(page2).has(page1)) {
					update[i] = page2;
					update[j] = page1;
					break;
				}
			}
		}
	}

	return update;
};

const solution2 = incorrectlyOrdered
	.map(swapIncorrectlyOrdered)
	.reduce(countSolution, 0);

console.log(solution2); // 5833
