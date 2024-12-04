const fs = require("node:fs");

fs.readFile("./adventOfCode_3_input.txt", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

    const calculationResult = (
        commandStr = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        withDOInstructions = false
    ) => {
        let count = 0
        let commandsEnabled = true

        for (let i = 0; i <= commandStr.length - 1; i++) {
            const char = commandStr[i]
            if (char === 'm' && commandStr.slice(i, i + 4) === 'mul(' && commandsEnabled) {
                let argStart = i + 4
                while (argStart <= commandStr.length - 1) {
                    if (commandStr[argStart] === ')') {
                        const args = commandStr.slice(i + 4, argStart);
                        const [first, second] = args.split(',')

                        count += first * second

                        break
                    }
                    if (commandStr[argStart] !== ',' && Number.isNaN(Number(commandStr[argStart]))) {
                        break
                    }

                    argStart += 1
                }
            } else if (withDOInstructions && char === "d") {
                if (commandStr.slice(i, i + 4) === 'do()') {
                    commandsEnabled = true
                } else if (commandStr.slice(i, i + 7) === 'don\'t()') {
                    commandsEnabled = false
                }
            }
        }

        return count
    }

    const noWhiteSpaces = data.replaceAll(" ", "");

    // PART I
    console.log(calculationResult(noWhiteSpaces, false)); //164730528

    // PART II
    console.log(calculationResult(noWhiteSpaces, true)); //70478672
});