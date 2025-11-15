import * as fs from 'fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });
let day = null;

while (!day) {
	const answer = await rl.question('What day to create? ');
	try {
		day = parseInt(answer);
		if (day < 1 || day > 25) {
			day = null;
		}
	} catch (e) {
		console.error(e);
	}
	
}
rl.close();

day = day + '';

if (day < 10) {
	day = '0' + day;
}

const code = await fs.readFile('00.ts');
await fs.writeFile(day + '.ts', code);
await fs.writeFile(day + '.txt', '');
