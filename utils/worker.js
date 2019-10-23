#!/usr/bin/env node

/**
 * Single Worker thread
 */
const path = require('path');
const fs = require('fs');
const process = require('process');

const { parentPort, workerData } = require('worker_threads');
const Reporter = require('./reporter.js'); //Require reporter class

function parseUser(dir) {
    return JSON.parse(fs.readFileSync(path.join(dir, 'user.json')));
}

//Holds overall data and results
const grades = {};

function runTests(dir){
    const Jasmine = require('jasmine');
    const jasmine = new Jasmine();
    const reporter = new Reporter();

    jasmine.loadConfig({
        spec_dir: dir,
        spec_files: ['**/*[sS]pec.js'],
        helpers: ['helpers/**/*.js'],
        random: false,
        seed: null,
        stopSpecOnExpectationFailure: false
    });

    jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

    jasmine.env.clearReporters();
    jasmine.addReporter(reporter);
    jasmine.execute();
    
    jasmine.onComplete(status => {
        try {
            const user = parseUser(workerData);
            if(typeof user === 'object'){
                grades[user.email] = {
                    name: user.name,
                    results : reporter.results
                }

                //Determine properties if exist in objects
                let hasProperties = (user.hasOwnProperty('name') && user.hasOwnProperty('email'));

                if(hasProperties){
                    console.log(JSON.stringify(grades, null, 2));
                }else{
                    console.error('\x1b[43m', user , '\x1b[0m' );
                    process.exitCode = 1;
                }
            }
        } catch (e) {
            console.error('\x1b[43m', 'There is an invalid user.json during grading!', '\x1b[0m' );
            process.exitCode = 1;
        }
    }); 
}

parentPort.once('message', message => parentPort.postMessage(runTests(message)));  
