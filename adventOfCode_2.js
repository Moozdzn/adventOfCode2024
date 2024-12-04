const fs = require("node:fs");

fs.readFile("./adventOfCode_2_input.txt", "utf8", (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

    const isChangeSafe = (previous, current) => {
        if (previous > 0 && current < 0) {
            return false;
        }

        if (previous < 0 && current > 0) {
            return false;
        }

        if (current === 0) {
            return false;
        }

        if (Math.abs(current) > 3) {
            return false;
        }

        return true;
    };

    const safe = (report) => {
        let safe = true;
        let previousLevel = report[1] - report[0];

        if (previousLevel === 0 || Math.abs(previousLevel) > 3) {
            safe = false;
        } else {
            for (let i = 2; i <= report.length - 1; i++) {
                const diff = report[i] - report[i - 1];

                if (!isChangeSafe(previousLevel, diff)) {
                    safe = false;
                    break;
                }

                previousLevel = diff;
            }
        }

        return safe;
    };

    const parsed = data.replaceAll("\r", "").split("\n").map((line) => line.split(" ").map((number) => Number.parseInt(number)));

    const unSafeReports = parsed.filter((report) => !safe(report));
    const safeReportsCount = parsed.length - unSafeReports.length;

	console.log(safeReportsCount);

    // PART II

    // there is a better way to do this, since we know the index that is not safe, then we only need to check removing that index and index + 1
    const dampenerSafeReportsCount = unSafeReports.reduce((acc, report) => {
        let removedIndex = 0

        while (removedIndex <= report.length - 1) {
            const reportWithoutLevel = report.filter((_, index) => index !== removedIndex);
            if (safe(reportWithoutLevel)) {
                return acc + 1
            }
            removedIndex = removedIndex + 1
        }

        return acc

    }, safeReportsCount);

	console.log(dampenerSafeReportsCount);
});
