const fs = require("node:fs");

const data = fs
	.readFileSync("./adventOfCode_6_input.txt", "utf8")
	.replaceAll("\r", "")
	.split("\n")
	.map((line) => line.split(""));

let INITIAL_GUARD_POSITION = [-1, -1];
let INITIAL_GUARD_DIRECTION = [0, 0];

const WIDTH = data[0].length - 1;
const HEIGHT = data.length - 1;

const GUARD_DIRECTIONS = new Map([
    ["^", [0, -1]],
    [">", [1, 0]],
    ["v", [0, 1]],
    ["<", [-1, 0]],
])

const GUARD_NEXT_DIRECTION = new Map([
	["^", ">"],
	[">", "v"],
	["v", "<"],
	["<", "^"],
]);

data.forEach((line, yIndex) => {
    const xIndex = line.indexOf("^");
    if (xIndex !== -1) {
        INITIAL_GUARD_POSITION = [xIndex, yIndex];
        INITIAL_GUARD_DIRECTION = GUARD_DIRECTIONS.get("^");
    }
});

const traceGuardPath = (value) => {
    const map = structuredClone(value);
    const pathPositions = new Set();

    let guardPosition = [...INITIAL_GUARD_POSITION];
    let guardDirection = [...INITIAL_GUARD_DIRECTION];

	while (true) {
		const [x, y] = guardPosition;
		const [dirX, dirY] = guardDirection;

		const nextX = x + dirX;
		const nextY = y + dirY;

		if (nextX < 0 || nextX > WIDTH || nextY < 0 || nextY > HEIGHT) {
			map[y][x] = "X";
			return [map, pathPositions];
		}

		let guardFacingIcon = map[y][x];
		const nextPosition = map[nextY][nextX];
		if (nextPosition === "#") {
			guardFacingIcon = GUARD_NEXT_DIRECTION.get(guardFacingIcon);
			guardDirection = GUARD_DIRECTIONS.get(guardFacingIcon);
			map[y][x] = guardFacingIcon;
		} else {
			guardPosition = [nextX, nextY];

			map[nextY][nextX] = guardFacingIcon;
			map[y][x] = "X";

            if (nextX !== INITIAL_GUARD_POSITION[0] || nextY !== INITIAL_GUARD_POSITION[1]) pathPositions.add(guardPosition.toString());
		}
	}
};

//PART I

const solution = () => {
    const [map] = traceGuardPath(data)
    return map.reduce((acc, line) => {
        return acc + line.filter((position) => position === "X").length;
    }, 0);
}

console.time("Part I Time");
console.log("Part I:", solution()); // 5453
console.timeEnd("Part I Time");

// PART II

const isGuardLooped = (value) => {
	const map = structuredClone(value);

	let guardPosition = [...INITIAL_GUARD_POSITION];
	let guardDirection = [...INITIAL_GUARD_DIRECTION];

    const samePath = new Set()

	while (true) {
		const [x, y] = guardPosition;
		const [dirX, dirY] = guardDirection;

		const nextX = x + dirX;
		const nextY = y + dirY;

		if (nextX < 0 || nextX > WIDTH || nextY < 0 || nextY > HEIGHT) {
			map[y][x] = "X";
			return false;
		}

		let guardFacingIcon = map[y][x];
		const nextPosition = map[nextY][nextX];

		if (nextPosition === "#" || nextPosition === "O") {
			guardFacingIcon = GUARD_NEXT_DIRECTION.get(guardFacingIcon);
			guardDirection = GUARD_DIRECTIONS.get(guardFacingIcon);
			map[y][x] = guardFacingIcon;
		} else {
            if (map[nextY][nextX] === 'X') {
                const key = `${guardPosition}-${guardDirection}`
                if (samePath.has(key)) {
                    return true;
                }
                samePath.add(key);
            }

			guardPosition = [nextX, nextY];

			map[nextY][nextX] = guardFacingIcon;
			map[y][x] = "X";
		}
	}
};

const solution2 = () => {
    const [_, guardPath] = traceGuardPath(data)
    const map = structuredClone(data)

    return Array.from(guardPath)
        .reduce((acc, position) => {
            const [x, y] = position.split(",").map(Number);
            map[y][x] = "O";
            const inLoop = isGuardLooped(map);
            map[y][x] = ".";
            return inLoop ? acc + 1 : acc
        }, 0)
};

console.time("Part II Time");
console.log("Part II:", solution2()); // 2188
console.timeEnd("Part II Time");