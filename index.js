import { promises as fs } from 'fs';

async function readFileAsync(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(`${filePath}:`, data);
        return data;
    } catch (err) {
        console.error('Error reading the file:', err);
        throw err;
    }
}

async function readFiles() {
    const file1 = await readFileAsync('a.txt');
    const file2 = await readFileAsync('b.txt');

    console.log('file1 + file2 summary:', +file1 + +file2);
}

readFiles();
