const fs = require("node:fs");

const isTestInput = process.argv[2] === "--test";

const data = fs
	.readFileSync(
		`./adventOfCode_8_${isTestInput ? "test" : "input"}.txt`,
		"utf8",
	)
	.replaceAll("\r", "")
	.split("\n")
    .map(line => line.split(""))

const visualize = (antiNodes) => {
    const clonedData = structuredClone(data);

    antiNodes.forEach((value, index) => {
        const [y, x] = value.split(",").map(Number);
        clonedData[y][x] = "#";
    });

    console.log(clonedData.map((line) => line.join("")).join("\n"));
}

const solution = () => {
    const WIDTH = data.length - 1
    const HEIGHT = data[0].length - 1

    const frequencies = new Map()

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const char = data[i][j]
            if (char !== '.')
                frequencies.set(char, frequencies.has(char) ? [...frequencies.get(char), [i, j]] : [[i, j]])
        }
    }

    const antiNodes = new Set()

    /* this can probably be improved by calculating both nodes at once */
    for (const positions of frequencies.values()) {
        for (let i = 0; i < positions.length; i++) {
            const antenna1 = positions[i]
            for (let j = 0; j < positions.length; j++ ) {
                if (i === j) continue
                const antenna2 = positions[j]

                const antiNodeDistanceX = antenna1[1] - antenna2[1];
                const antiNodeDistanceY = antenna1[0] - antenna2[0];

                const nodeY = antenna1[0] + antiNodeDistanceY
                const nodeX = antenna1[1] + antiNodeDistanceX

                if (nodeY < 0 || nodeY > HEIGHT) continue
                if (nodeX < 0 || nodeX > WIDTH) continue;

                antiNodes.add([nodeY, nodeX].toString());
            }
        }
    }

    visualize(antiNodes);

    return antiNodes.size
}

const solution2 = () => {
    
    const WIDTH = data.length - 1
    const HEIGHT = data[0].length - 1

    const frequencies = new Map()

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const char = data[i][j]
            if (char !== '.')
                frequencies.set(char, frequencies.has(char) ? [...frequencies.get(char), [i, j]] : [[i, j]])
        }
    }

    const antiNodes = new Set();

    for (const positions of frequencies.values()) {
        for (let i = 0; i < positions.length; i++) {
            const antenna1 = positions[i]
            antiNodes.add(antenna1.toString());
            for (let j = 0; j < positions.length; j++ ) {
                if (i === j) continue
                const antenna2 = positions[j]

                const antiNodeDistanceX = antenna1[1] - antenna2[1];
                const antiNodeDistanceY = antenna1[0] - antenna2[0];

                let factor = 1

                while (true) {
                    const nodeY = antenna1[0] + (antiNodeDistanceY * factor)
                    const nodeX = antenna1[1] + (antiNodeDistanceX * factor)

                    if (nodeY < 0 || nodeY > HEIGHT) break
                    if (nodeX < 0 || nodeX > WIDTH) break;

                    antiNodes.add([nodeY, nodeX].toString());
                    factor++
                }
            }
        }
    }

    visualize(antiNodes);

    return antiNodes.size;
}

console.log(solution());
console.log(solution2());