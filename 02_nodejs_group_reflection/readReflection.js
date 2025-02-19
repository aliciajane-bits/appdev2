const fs = require('fs');

const fileName = 'reflection.txt';

fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
        console.error('Error:', err.message);
        return;
    }
    console.log('File Contents:\n', data);
});