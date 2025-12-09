export const part1 = async (d: string) => {
	const junctionBoxes = d.split('\n');
	const distances: [number, string, string][] = [];
	const connectionGroups = new Map<number, string[]>();
	const connectionGroupsIdx = new Map<string, number>();

	for (let i = 0; i < junctionBoxes.length; i++) {
		connectionGroupsIdx.set(junctionBoxes[i], i);
		connectionGroups.set(i, [junctionBoxes[i]]);
		const [x1, y1, z1] = junctionBoxes[i].split(',').map(e => +e);
		for (let j = i + 1; j < junctionBoxes.length; j++) {
			const [x2, y2, z2] = junctionBoxes[j].split(',').map(e => +e);
			const distance = (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;
			distances.push([distance, junctionBoxes[i], junctionBoxes[j]]);
		}
	}
	distances.sort((a, b) => a[0] - b[0]);
	for (let i = 0; i < 1000; i++) { // TODO: Change to 1000 when doing the actual input
		const connection = distances.shift();
		if (connectionGroupsIdx.get(connection[1]) != connectionGroupsIdx.get(connection[2])) {
			// Connections not in the same group, move to the same group
			const group1Idx = connectionGroupsIdx.get(connection[1]);
			const group2Idx = connectionGroupsIdx.get(connection[2]);

			const group1 = connectionGroups.get(group1Idx);
			const group2 = connectionGroups.get(group2Idx);
			group1.push(...group2);
			for (const box of group2) {
				connectionGroupsIdx.set(box, group1Idx);
			}
			connectionGroups.delete(group2Idx);
		}
	}

	const groupsSorted = [...connectionGroups.values()];
	groupsSorted.sort((a, b) => b.length - a.length);
	let total = 1n;
	for (let i = 0; i < 3; i++) {
		total *= BigInt(groupsSorted[i].length);
	}
	return total.toString();
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
