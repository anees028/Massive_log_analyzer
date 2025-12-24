import * as fs from 'fs';
import * as zlib from 'zlib';
import { Transform, TransformCallback } from 'stream';
import { pipeline } from 'stream/promises'; // Modern way to pipe with error handling

const INPUT_FILE = './massive-log.txt';
const OUTPUT_FILE = './errors-only.log.gz'; // Note the .gz extension


// Define our custom Filter Robot
class ErrorFilterStream extends Transform {
  constructor() {
    super();
  }

  // This method runs for every chunk of data passing through the pipe
  _transform(chunk: Buffer, encoding: string, callback: TransformCallback) {
    // 1. Convert the binary buffer to a string so we can read it
    const textData = chunk.toString();

    // 2. Logic: We only want to pass lines that have "ERROR"
    // Since chunks might contain multiple lines, we need to process them carefully.
    const lines = textData.split('\n');
    
    // We filter the lines, keeping only ERRORS
    const errorLines = lines.filter(line => line.includes('[ERROR]'));

    // 3. If we found errors, push them to the next stage of the pipeline
    if (errorLines.length > 0) {
      // Join them back together and add a newline
      this.push(errorLines.join('\n') + '\n');
    }

    // 4. Tell Node we are done with this chunk and ready for the next one
    callback();
  }
}


async function runPipeline() {
  console.time('Compression Pipeline');

  // 1. The Source
  const source = fs.createReadStream(INPUT_FILE);

  // 2. The Transformers
  const filterRobot = new ErrorFilterStream();
  const compressor = zlib.createGzip(); // Built-in Gzip transformer

  // 3. The Destination
  const destination = fs.createWriteStream(OUTPUT_FILE);

  try {
    // 4. Connect them all!
    // Ideally: source.pipe(filter).pipe(compressor).pipe(dest)
    // We use 'pipeline' helper because it handles errors better automatically
    await pipeline(
      source,
      filterRobot,
      compressor,
      destination
    );

    console.log('Pipeline Succeeded!');
  } catch (err) {
    console.error('Pipeline Failed:', err);
  }

  console.timeEnd('Compression Pipeline');
}

runPipeline();