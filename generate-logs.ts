// generate-logs.ts
import * as fs from 'fs';

const stream = fs.createWriteStream('./massive-log.txt');

for (let i = 0; i < 1e6; i++) {
  const type = i % 10 === 0 ? 'ERROR' : 'INFO'; // 10% errors
  const message = `${new Date().toISOString()} [${type}] System process ID ${i}\n`;
  
  // write() returns false if the buffer is full. 
  // Ideally, we should handle 'drain' events, but for now, we force it.
  stream.write(message);
}

stream.end(() => console.log('Done generating file.'));