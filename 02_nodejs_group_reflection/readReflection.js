const fs = require('fs').promises;

const fileName = 'reflection.txt';

async function readFileAsync() {
    const data = await fs.readFile(fileName, 'utf8'); // Read file asynchronously
        console.log('File Contents:\n', data); 
}

readFileAsync();
    