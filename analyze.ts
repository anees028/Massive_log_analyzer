// analyze.ts
import * as fs from 'fs';
import * as readline from 'readline';

// 1. Define the shape of our parsed data
interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'ERROR' | 'WARN';
  message: string;
}

async function processLogs(inputFile: string, outputFile: string) {
  console.time('Processing'); // Start timer

  // 2. Create Streams
  const fileStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);

  // 3. Create an Interface to read line by line
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let errorCount = 0;

  // 4. Process line by line
  for await (const line of rl) {
    // Check if line contains ERROR (simple string check is faster than regex)
    if (line.includes('[ERROR]')) {
      
      // OPTIONAL: Parse the string into a TS object to demonstrate typing
      const parts = line.split(' ');
      const logEntry: LogEntry = {
        timestamp: parts[0],
        level: 'ERROR',
        message: line
      };

      // Write to the new file
      // Note: We must write strings or buffers, not raw objects
      const cleanLine = `${logEntry.timestamp} - Found Issue: ${logEntry.message}`;
      
      // writeStream.write returns a boolean (false = buffer full). 
      // In high-performance apps, you'd pause here.
      const canWrite = writeStream.write(cleanLine + '\n');
      errorCount++;
    }
  }

  console.log(`Finished! Found ${errorCount} errors.`);
  console.timeEnd('Processing'); // See how fast it was
}

processLogs('./massive-log.txt', './errors-only.txt');