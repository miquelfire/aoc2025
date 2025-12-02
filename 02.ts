/**
 * Assumes the length of both numbers are the same
 */
function createSubRange (beginNum: string, endNum: string) {
	const halfPoint = Math.trunc(beginNum.length/2);
	const rangeLength = beginNum.length - halfPoint;
	if (rangeLength != halfPoint) {
		// Can't make the pattern with this 
		return null;
	}
	return [+(beginNum.slice(0, halfPoint)), +(endNum.slice(0, halfPoint))];
}

export const part1 = async (d: string) => {
	let sum = 0n;
	// Split on whitespace as the sample has linebreaks
	const ranges = d.split(/,[\s]*/).map(ranges => {
		const range = ranges.split('-');
		const ret = {
			// the full range to check
			fullRange: range.map(e => +e),
			// If the range is something like 902-123045, this will be 9-9, 10-99, 100-123
			// Used to check for different patterns, only the first half is used
			subRanges: [],
		};
		if (range[0].length != range[1].length) {
			ret.subRanges.push(createSubRange(range[0], '9'.padEnd(range[0].length, '9')));
			for (let l = range[0].length + 1; l < range[1].length; l++) {
				ret.subRanges.push(createSubRange('1'.padEnd(l, '0'), '9'.padEnd(l, '9')));
			}
			ret.subRanges.push(createSubRange('1'.padEnd(range[1].length, '0'), range[1]));
		} else {
			ret.subRanges.push(createSubRange(range[0], range[1]));
		}
		ret.subRanges = ret.subRanges.filter(e => e);
		return ret;
	});
	ranges.forEach(e => {
		e.subRanges.forEach((subRange) => {
			for (let i = subRange[0]; i <= subRange[1]; i++) {
				const pattern = +(i + '' + i);
				if (pattern <= e.fullRange[1] && pattern >= e.fullRange[0]) {
					sum += BigInt(pattern);
				}
			}
		});
	});
	return sum.toString();
};

export const part2 = async (d: string) => {
	const ranges = d.split(/,[\s]*/).map(e => e.split('-').map(e => +e));
	const regex = /^(.+?)\1+$/;
	let sum = 0n;
	ranges.forEach(e => {
		for (let i = e[0]; i <= e[1]; i++) {
			if (regex.test('' + i)) {
				sum += BigInt(i);
			}
		}
	});
	return sum.toString();
};
