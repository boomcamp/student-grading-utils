#!/usr/bin/env node

/**
 * Single Worker thread
 */
const path = require('path');
const fs = require('fs');

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
        const user = parseUser(workerData);
        grades[user.email] = {
            name: user.name,
            results : reporter.results
        }
        //Display formatted results
        var str = JSON.stringify(grades, null, 2);
        console.log(str);
    }); 
}

parentPort.once('message', message => parentPort.postMessage(runTests(message)));  
