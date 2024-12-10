const fs = require("node:fs");

const isTestInput = process.argv[2] === "--test";

const data = fs
	.readFileSync(
		`./adventOfCode_10_${isTestInput ? "test" : "input"}.txt`,
		"utf8",
	)
	.replaceAll("\r", "")
	.split("\n")
	.map((line) => line.split("").map((value) => Number.parseInt(value)));

const DIRECTIONS = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
];

const WIDTH = data[0].length;
const HEIGHT = data.length;

const isValidTrail = (data, y, x, height = 0, endPositions = new Set(), count = 0) => {
    if (height === 9) {
        endPositions.add(`(${y},${x})`)
        return [count + 1];
    };

    for (let i = 0; i < DIRECTIONS.length; i++) {
        const [dy, dx] = DIRECTIONS[i];
        const nextY = y + dy;
        const nextX = x + dx;

        if (nextY < 0 || nextY >= HEIGHT || nextX < 0 || nextX >= WIDTH) continue
        if (data[nextY][nextX] !== height + 1) continue

        const [newCount] = isValidTrail(data, nextY, nextX, height + 1, endPositions, count)
        count = newCount;
    }

    return [count, endPositions];
}

const bothSolutions = (data) => {
    const trailHeads = new Set();

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 0) {
                trailHeads.add([i, j]);
            }
        }
    }

    const trails = [...trailHeads]
        .map((value) => {
            const [y, x] = value;
            const [count, result] = isValidTrail(data, y, x);
            return [Array.from(result), count];
        })

    return trails.reduce((acc, value) => [acc[0] + value[0].length, acc[1] + value[1]], [0, 0])
}

console.time("Day 10 Time");
console.log("Day 10:", bothSolutions(data)); // [593, 1192]
console.timeEnd("Day 10 Time");

