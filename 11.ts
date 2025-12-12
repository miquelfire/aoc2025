import { memoize } from './utils.ts';

export const part1 = async (d: string) => {
	return null;// Until I get back to my input
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
	const devices = d.split('\n').map(e => e.split(': '));
	const deviceMap = new Map<string, string[]>();
	for (const device of devices) {
		const deviceId = device[0];
		const paths = device[1].split(' ');
		deviceMap.set(deviceId, paths);
	}

	type travelPathReturn = { hasDAC: boolean, hasFFT: boolean, count: bigint };
	const travelValidPaths = (device: string): travelPathReturn|null => {
		const validPaths: travelPathReturn[] = [];
		const paths = deviceMap.get(device);
		let foundDAC = false;
		let foundFFT = false;
		for (const subPath of paths) {
			if (subPath == 'out') {
				validPaths.push({ hasDAC: false, hasFFT: false, count: 1n });
				break;
			}
			const checkPath = memoizedTravelValidPaths(subPath);
			if (!checkPath) {
				continue;
			}

			// prefer paths with DAC or FFT device
			if (checkPath.hasDAC != foundDAC && foundDAC == false) {
				foundDAC = true;
				validPaths.splice(0, validPaths.length);
			}
			if (checkPath.hasFFT != foundFFT && foundFFT == false) {
				foundFFT = true;
				validPaths.splice(0, validPaths.length);
			}
			if (checkPath.hasDAC == foundDAC && checkPath.hasFFT == foundFFT) {
				validPaths.push(checkPath);
			}
		}
		return {hasDAC: (device == 'dac') || foundDAC, hasFFT: (device == 'fft') || foundFFT, count: validPaths.reduce((p, v) => p + v.count, 0n)};
	};
	const memoizedTravelValidPaths = memoize(travelValidPaths);

	return memoizedTravelValidPaths('svr').count.toString();
};
