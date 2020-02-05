# Student Grading Utils
Automated grading utility for student submissions, original source repository https://github.com/boomcamp/grading-utils

List of repositories :

1. [html-css-final](https://github.com/boomcamp/html-css-final)
2. [javascript-1](https://github.com/boomcamp/javascript-1)
3. [javascript-2-arrays](https://github.com/boomcamp/javascript-2-arrays)
4. [javascript-2-objects](https://github.com/boomcamp/javascript-2-objects)
5. [javascript-3-this](https://github.com/boomcamp/javascript-3-this)
6. [javascript-4-callbacks](https://github.com/boomcamp/javascript-4-callbacks)
7. [javascript-4-prototype](https://github.com/boomcamp/javascript-4-prototype)
8. [javascript-5-promises](https://github.com/boomcamp/javascript-5-promises)


### Downloading a copy
```
git clone -b master git@github.com:boomcamp/student-grading-utils.git
```


## Folder structure
```
student-grading-utils/
.
├── bin
│   ├── env.sh
│   ├── grade_html_css_final.sh
│   ├── grade_jasmine_spec_repo.sh
│   └── reset.sh
├── Dockerfile
├── Dockerfile1
├── final_1366x768.png
├── grade.env
├── package.json
├── package-lock.json
├── README.md
├── screenshots
│   ├── grade-html-css.png
│   └── jasmine-report.png
└── utils
    ├── downloadPullRequestRepos.js
    ├── gradeHtmlCssFinal.js
    ├── gradeJasmineSpecRepo.js
    ├── reporter.js
    └── worker.js

3 directories, 18 files

```

Definitions:

```
1.  student-grading-utils = The base folder.
2.  utils = Javascript files uses to grade student submissions.
3.  output_dir = The output folder that contains extracted student submissions folder from `tmp` folder.
4.  tmp = Temporary folder to store pull request in `.gz` format.
5.  bin = Contains executable scripts for grading.
6.  final_1366x768 = Default image to compare downloaded `html-css-final` student submissions.
7.  checker = variable to specify executable scripts for grading.
8.  execfile = variable to execute reset.sh to empty output_dir and tmp folders after grading.
9.  screenshots = Example demonstrations.
10. grade.env = Docker environment variables.
10  Dockerfile,Dockerfile1 = Use to build docker image for student-grading-utils.
```
  

## Manual setup and installation.

**Setup**:

1. **/bin/.env** = Holds system variables for grading.

Example contents:

```
export branch=submission
export repo=https://github.com/boomcamp/javascript-2-arrays
export BASH_SOURCE=/bin/bash
export output_dir=/home/dev-mentor/Downloads/student-grading-utils/output_dir
export tmpdir=/home/dev-mentor/Downloads/student-grading-utils/tmp #/var/tmp
export reference_image=/home/dev-mentor/Downloads/student-grading-utils/final_1366x768.png
export submissions=/output_dir/
export execfile=/home/webdev/Desktop/student-grading-utils/bin/reset.sh

```

  

**Installation**:

1. Install dependencies

```
cd student-grading-utils && npm install
```

2. Export variables inside `bin` folder.

```
cd bin && ./env.sh
```

3. Reloading variables.

```
cd bin && source ./env
```

  
## Executing command inside bin folder.

1. How to grade student `html-css-final` submissions.

```
cd bin && ./grade_htmls_css_final.sh

```

2. How to grade `javascript` submissions.

```
cd bin && ./grade_jasmine_spec_repo.sh

```

## Executing commands using docker.

1. Update `student-grading-utils/grade.env` with necessary data to download and grade student submissions.

**grade.env**

```
branch=submission
repo=https://github.com/boomcamp/html-css-final
output_dir=/student-grading-utils/output_dir
tmpdir=/student-grading-utils/tmp
reference_image=/student-grading-utils/final_1366x768.png
submissions=/output_dir/
checker=grade_html_css_final.sh
execfile=/student-grading-utils/bin/reset.sh

```

2. Build student-grading-utils container.
```
docker-compose up .
```
3. Execute the docker container and interact with the CLI.
```
docker container -it [docker container id/name] bash
```

4. Now in the CLI, execute the commands needed.

example:

```
./grade_html_css_final.sh
```

Note: When you update the ENVIRONMENT file grade.env, 
you will need to reload the variables.
```
source ./grade.env 
```

in the dockerfile CLI.

### Maintainers

1. Aodhan Hayter 
2. Jino Lacson
3. John Michael Bolima
4. Daniel Nebreja
5. Koji Adriano
6. Robi Ann Eslava
7. Bryan Alfuente
