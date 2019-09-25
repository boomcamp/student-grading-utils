#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Worker, workerData, isMainThread } = require('worker_threads');

/**
 * Read two arguments:
 * --directories
 * --submissions
 */
const argv = require('yargs').option('directories', {
  alias: 'o',
  describe: 'a newline delimited string of directories',
  demandOption: true,
  type: 'string',
})
.option('submissions', {
  alias: 'd',
  describe: 'submissions folder',
  demandOption: true,
  type: 'string',
}).argv;

const config = {
  dirs: argv.directories,
  submissions: argv.submissions
};

//Read subfolders under output_dir/
function readdirAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Command: 
 *   node utils/index.js --submissions=/submissions/ --directories=/home/dev-mentor/Pictures/jasmineConsoleReporter/submissions
 * 
 * Parameters:
 *   --submissions = The students `output_dir` folder inside `student-grading-utils` 
 * 
 *   --directories = The present working directory
 * 
 */

(async function main({ submissions, dirs }) {
  if(isMainThread){
    students = await readdirAsync(dirs);
    for(let repoPath of students){
      const submissionPath = path.join(dirs, repoPath)
      
      //Instantiate multithreaded worker
      const thread = new Worker('../utils/worker.js', {workerData : submissionPath});
      thread.on('message', message => console.log(message));  
      thread.postMessage(path.join(".."+submissions, repoPath));
    }
  }
})(config);

