export const part1 = async (d: string) => {
	const map = d.split('\n').map(e => e.split(''));
	const start = [0, map[0].indexOf('S')];
	const splittersHit = new Set<string>();
	const beamsPaths = new Set<string>();
	const beams = [start];

	while (beams.length > 0) {
		const beam = beams.pop();
		if (beamsPaths.has(beam.join('x'))) {
			continue;
		}
		beamsPaths.add(beam.join('x'));

		while (beam[0] < map.length) {
			if (map[beam[0]][beam[1]] == '^') {
				splittersHit.add(beam.join('x'));
				beams.push([beam[0] + 1, beam[1] - 1]);
				beams.push([beam[0] + 1, beam[1] + 1]);
				break;
			}

			beam[0]++;
		}
	}
	return splittersHit.size;
};

export const part2 = async (d: string) => {
	/*
		Most likely good in the reading of the rows
		Map of beams with col as the key, count as value
		Every spliter will split the beam between the two columns to its side, adding the count
		Once map is processed, add up all the values
	*/
	const beams = new Map<number, bigint>();
	// Map of beams with the col as the key
	const map = d.split('\n');
	
	for (const line of map) {
		const cols = line.split('');
		for (const [col, char] of cols.entries()) {
			switch (char) {
				case '^': {
					//debugger;
					const oldCount = beams.get(col);
					if (typeof oldCount == 'bigint') {
						// Old beam
						beams.delete(col);
						if (beams.has(col - 1)) {
							beams.set(col - 1, beams.get(col - 1) + oldCount);
						} else {
							beams.set(col - 1, oldCount);
						}						
						if (beams.has(col + 1)) {
							beams.set(col + 1, beams.get(col + 1) + oldCount);
						} else {
							beams.set(col + 1, oldCount);
						}						

					}
					break;

				}
				case 'S':
					beams.set(col, 1n);
					break;
				case '.':
					// Nothing to be done with this character
					break;
				default:
					throw Error(`Unknown character: (${char})`);
			}
		};
	};
	return [...beams.values()].reduce((p, v) => p + v, 0n).toString();
};
