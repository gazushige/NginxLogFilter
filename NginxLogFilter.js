const fs = require('fs');
const readline = require('readline');
const { DateTime } = require('luxon');

const logFilePath = './access.log';
const expiryDays = 60;
const expiryDate = DateTime.utc().minus({ days: expiryDays }).toJSDate();

// Function to process each log line
const processLogLine = (line) => {
    // Extract date string between '[' and ']' and replace month abbreviations
    const dateString = line.match(/\[(.*?)\]/)[1].slice(0, 20).replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (match, p1) => {
        return ('0' + (['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(p1) + 1)).slice(-2);
    });

    // Convert date string to a Date object
    const logDate = DateTime.fromFormat(dateString, "dd/MM/yyyy:HH:mm:ss").toJSDate();

    // Return whether the log date is within the expiry date
    return logDate >= expiryDate;
};

// Filtering function
const Filtering = () => {
    const rl = readline.createInterface({
        input: fs.createReadStream(logFilePath),
        output: process.stdout,
        terminal: false
    });

    const ws = fs.createWriteStream(logFilePath + '.temp');

    rl.on('line', (line) => {
        if (processLogLine(line)) {
            ws.write(line + '\n');
        }
    });

    rl.on('close', () => {
        ws.end(() => {
            fs.rename(logFilePath + '.temp', logFilePath, (err) => {
                if (err) {
                    console.error('Error renaming file:', err);
                } else {
                    console.log('File written successfully.');
                }
            });
        });
    });
};

// Execute the filtering function
Filtering();
