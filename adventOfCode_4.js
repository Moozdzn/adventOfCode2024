const fs = require("node:fs");

const data = fs
	.readFileSync("./adventOfCode_4_input.txt", "utf8")
	.replaceAll("\r", "")
	.split("\n");
const lines = data.map((line) => line.split(""));

const WIDTH = lines[lines.length - 1].length - 1;
const HEIGHT = lines.length - 1;

const XMAS = "XMAS";

const isWordHorizontal = (x, y) => {
	let found = 0;

	if (x - 3 >= 0) {
		const word = `${lines[y][x]}${lines[y][x - 1]}${lines[y][x - 2]}${lines[y][x - 3]}`;
		found += word === XMAS ? 1 : 0;
	}

	if (x + 3 <= WIDTH) {
		const word = `${lines[y][x]}${lines[y][x + 1]}${lines[y][x + 2]}${lines[y][x + 3]}`;
		found += word === XMAS ? 1 : 0;
	}

	return found;
};

const isWordVertical = (x, y) => {
	let found = 0;
	if (y - 3 >= 0) {
		const word = `${lines[y][x]}${lines[y - 1][x]}${lines[y - 2][x]}${lines[y - 3][x]}`;
		found += word === XMAS ? 1 : 0;
	}

	if (y + 3 <= HEIGHT) {
		const word = `${lines[y][x]}${lines[y + 1][x]}${lines[y + 2][x]}${lines[y + 3][x]}`;
		found += word === XMAS ? 1 : 0;
	}

	return found;
};

const isWordDiagonal = (x, y) => {
	let found = 0;

	// ↖️
	if (x - 3 >= 0 && y - 3 >= 0) {
		const word = `${lines[y][x]}${lines[y - 1][x - 1]}${lines[y - 2][x - 2]}${lines[y - 3][x - 3]}`;
		found += word === XMAS ? 1 : 0;
	}
	//↘️
	if (y + 3 <= HEIGHT && x + 3 <= WIDTH) {
		const word = `${lines[y][x]}${lines[y + 1][x + 1]}${lines[y + 2][x + 2]}${lines[y + 3][x + 3]}`;
		found += word === XMAS ? 1 : 0;
	}
	//↗️
	if (x + 3 <= WIDTH && y - 3 >= 0) {
		const word = `${lines[y][x]}${lines[y - 1][x + 1]}${lines[y - 2][x + 2]}${lines[y - 3][x + 3]}`;
		found += word === XMAS ? 1 : 0;
	}
	//↙️
	if (x - 3 >= 0 && y + 3 <= HEIGHT) {
		const word = `${lines[y][x]}${lines[y + 1][x - 1]}${lines[y + 2][x - 2]}${lines[y + 3][x - 3]}`;
		found += word === XMAS ? 1 : 0;
	}

	return found;
};

// PART I

let partICount = 0;

for (let i = 0; i < lines.length; i++) {
	const line = lines[i];

	for (let j = 0; j < line.length; j++) {
		const letter = line[j];

		if (letter === "X") {
			partICount += isWordHorizontal(j, i);
			partICount += isWordVertical(j, i);
			partICount += isWordDiagonal(j, i);
		}
	}
}

console.log(partICount); // 2618

// PART II

const X_MAS_OPTIONS =  new Map([
    ["M.M.A.S.S", 1],
    ["M.S.A.M.S", 1],
    ["S.S.A.M.M", 1],
    ["S.M.A.S.M", 1]
])

const isWordX_MAS = (x, y) => {
    // ↖️
	if (x - 1 < 0 || y - 1 < 0) return 0;
	//↘️
	if (y + 1 > HEIGHT || x + 1 > WIDTH) return 0;
	//↗️
	if (x + 1 > WIDTH || y - 1 < 0) return 0;
	//↙️
	if (x - 1 < 0 || y + 1 > HEIGHT) return 0;

    const pattern = `${lines[y - 1][x - 1]}.${lines[y - 1][x + 1]}.A.${lines[y + 1][x - 1]}.${lines[y + 1][x + 1]}`;

    return X_MAS_OPTIONS.has(pattern);
}

let partIICount = 0;

for (let i = 0; i < lines.length; i++) {
	const line = lines[i];

	for (let j = 0; j < line.length; j++) {
		const letter = line[j];

		if (letter === "A") {
			partIICount += isWordX_MAS(j, i) ? 1 : 0;
		}
	}
}

console.log(partIICount); // 2011