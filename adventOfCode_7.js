const fs = require("node:fs");


const isTestInput = process.argv[2] === "--test";

const data = fs
	.readFileSync(`./adventOfCode_7_${isTestInput ? "test" : "input"}.txt`, "utf8")
	.replaceAll("\r", "")
	.split("\n")
	.map((line) => {
        const [result, numbers] = line.split(":")
        return [Number(result), numbers.match(/[0-9]+/g).map(Number)];
    });

const tryToken = (isSum, final, current, numbers, index) => {
    const b = numbers[index]
    const value = isSum ? current + b : current * b;

    if (value === final){
        return true
    };

    if (index === numbers.length - 1) {
        return false;
    }

    return tryToken(isSum, final, value, numbers, index + 1) || tryToken(!isSum, final, value, numbers, index + 1);
}


const solution = () => {
    return data.reduce((acc, value) => {
        const [result, numbers] = value
        const isValid = tryToken(true, result, numbers[0], numbers, 1) || tryToken(false, result, numbers[0], numbers, 1);
        return isValid ? acc + result : acc;
    }, 0)
}

console.log(solution());


const solution2 = () => {

}
