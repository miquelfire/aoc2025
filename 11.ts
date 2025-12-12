export const part1 = async (d: string) => {
	const devices = d.split('\n').map(e => e.split(': '));
	const deviceMap = new Map<string, string[]>();
	const devicePathCount = new Map<string, number>();
	const devicePathToCount: string[] = [];
	for (const device of devices) {
		const deviceId = device[0];
		const paths = device[1].split(' ');
		deviceMap.set(deviceId, paths);
		devicePathToCount.push(deviceId);
	}

	while (devicePathToCount.length > 0) {
		const device = devicePathToCount.shift();
		const paths = deviceMap.get(device);
		if (typeof paths == 'undefined') {
			throw new Error('How?');
		}
		if (paths.length == 1 && paths[0] == 'out') {
			devicePathCount.set(device, 1);
		} else {
			const pathCount = [];
			let computed = true;
			for (const path of paths) {
				if (!devicePathCount.has(path)) {
					computed = false;
					break;
				}
				pathCount.push(devicePathCount.get(path));
			}

			if (computed) {
				devicePathCount.set(device, pathCount.reduce((p, v) => p + v, 0));
			} else {
				devicePathToCount.push(device);
			}
		}
	}

	return devicePathCount.get('you');
};

export const part2 = async (d: string) => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
