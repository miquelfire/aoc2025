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
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
