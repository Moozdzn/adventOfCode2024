const fs = require("node:fs");

const isTestInput = process.argv[2] === "--test";

const data = fs
	.readFileSync(
		`./adventOfCode_11_${isTestInput ? "test" : "input"}.txt`,
		"utf8",
	)
	.split(" ").map((stone) => Number.parseInt(stone));

const solution = (stones, blinks = 25) => {
	let newStones = [...stones];

	for (let i = 0; i < blinks; i++) {
		newStones = newStones.flatMap((stone) => {
			if (stone === 0) return 1;

            const digits = stone.toString()
			if (digits.length % 2 === 0) {
				const arrayDigits = digits.split("");
				const middle = digits.length / 2;

				return [
					+arrayDigits.slice(0, middle).join(""),
					+arrayDigits.slice(middle, stone.length).join(""),
				];
			}
			return stone * 2024;
		});
	}

	return newStones.length;
};

console.time("Day 11 Part I Time");
console.log("Day 11 Part I:", solution(data)); // 193269
console.timeEnd("Day 11 Part I Time");

/* 
    Rip array
*/
const solution2 = (stones, blinks = 75) => {
    const stoneCache = new Map(stones.map((stone) => [stone, 1]));
    for (let i = 0; i < blinks; i++) {

        const entries = [...stoneCache.entries()];

        for (const [stone, count] of entries) {
            stoneCache.set(stone, stoneCache.get(stone) - count);
            if (stone === 0) {
                stoneCache.set(1, (stoneCache.get(1) ?? 0) + count);
			} else if (stone.toString().length % 2 === 0) {
                const digits = stone.toString();
                const arrayDigits = digits.split("");
                const middle = digits.length / 2;

                const rightStone = +arrayDigits.slice(0, middle).join("");
                stoneCache.set(rightStone, (stoneCache.get(rightStone) ?? 0) + count);

                const leftStone = +arrayDigits.slice(middle, stone.length).join("");
                stoneCache.set(leftStone, (stoneCache.get(leftStone) ?? 0) + count);
                
            } else {
                stoneCache.set(stone * 2024, (stoneCache.get(stone * 2024) ?? 0) + count);
            }
        }
    }

    return [...stoneCache.values()].reduce((a, b) => a + b, 0);
}

console.time("Day 11 Part II Time");
console.log("Day 11:", solution2(data)); // 228449040027793
console.timeEnd("Day 11 Part II Time");