#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const pMatch = require('pixelmatch');
const { PNG } = require('pngjs');

/**
 * Node arguments
 */
const argv = require('yargs')
  .option('reference', {
    alias: 'r',
    describe: 'The reference image to compare the rendered page to',
    demandOption: true,
    type: 'string',
  })
  .option('directories', {
    alias: 'd',
    describe: 'a newline delimited string of directories',
    demandOption: true,
    type: 'string',
  }).argv;

const config = {
  dirs: argv.directories,
  referenceImage: argv.reference,
};

/**
 * 
 * @param {*} browser = puppeteer instance variable
 * @param {*} referencePNG getPNG instance variable
 * @param {*} dir = base directory + student folder
 */
async function getDiffPercentage(browser, referencePNG, dir) {
  if (!dir) return;
  console.error(`Grading: ${dir}`);

  const page = await browser.newPage();
  const renderedPNGPath = `${dir}/rendered.png`;

  await page.setViewport({
    width: 1366,
    height: 768,
  });
  await page.goto(`file://${dir}/index.html`);
  await page.screenshot({
    path: renderedPNGPath,
    fullPage: true,
  });

  const renderedPNG = await getPNG(renderedPNGPath);
  const diffPNG = new PNG({ width: referencePNG.width, height: referencePNG.height });
  const mismatched = pMatch(
    referencePNG.data,
    renderedPNG.data,
    diffPNG.data,
    referencePNG.width,
    referencePNG.height
  );
  await page.close();
  console.error(mismatched);
  diffPNG.pack().pipe(fs.createWriteStream(`${dir}/diff.png`));
  return (mismatched / (referencePNG.width * referencePNG.height)) * 100;
}

function getPNG(filePath) {
  return new Promise((resolve, reject) => {
    const image = fs.createReadStream(filePath).pipe(new PNG());
    image.on('parsed', function(data) {
      return resolve(this);
    });
    image.on('error', function(err) {
      return reject(err)
    });
  });
}

/**
 * 
 * @param {*} path = Single path directory 
 */
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
 * Main execution file
 */
(async function main({ dirs, referenceImage }) {
  console.log("Params" +dirs + " ," + referenceImage)
  let results = {};

  try {
    const referencePNG = await getPNG(referenceImage);
    const browser = await puppeteer.launch({
  executablePath: process.env.CHROMIUM_PATH, //this is important. execute the chromium
  args: ['--no-sandbox', '--disable-setuid-sandbox'], // This was important. Can't remember why
});
    students = await readdirAsync(dirs);
    for (let repoPath of students) {
        const diffPercentage = await getDiffPercentage(browser, referencePNG,path.join(dirs,repoPath));
        const user = JSON.parse(fs.readFileSync(`${path.join(dirs,repoPath)}/user.json`))
        results[user.email] = {
          name: user.name,
          diffPercentage,
        }
    }
  await browser.close();
  var str = JSON.stringify(results, null, 2);
  console.log(str)
   
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
})(config);
