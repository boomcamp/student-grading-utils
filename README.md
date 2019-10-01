# Student grading utility helper

  

Original source repository https://github.com/boomcamp/grading-utils

  

## Downloading a copy

  

```

git clone -b [the branch] git@github.com:boomcamp/student-grading-utils.git

```

  

## Folder structure

  

```

student-grading-utils/

bin/

output_dir/

tmp/

utils/

```

  

1.  **student-grading-utils** = The base directory.

  

2.  **utils** = Javascript files uses to grade student submissions.

  

3.  **output_dir** = The output folder that contains extracted student submissions folder from `tmp` folder.

  

4.  **tmp** = Temporary folder to store pull request in `.gz` format.

  

5.  **bin** = Contains executable scripts for grading.

  

6.  **final_1366x768** = Example image to compare downloaded `html css` submissions.

  

7.  **checker** = variable to specify executable scripts for grading.

8. **execfile** = variable to execute reset.sh to empty output_dir and tmp folders after grading.

  

## Setup and Installation

  

Setup description:

  

1. /bin/.env = Holds system variables, example present working directory `/home/dev-mentor/Downloads/student-grading-utils/`.

  

Example:

  

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

  

Installation:

  

1. Install dependencies

  

```

npm install

```

  

2. Export variables inside `bin` folder

  

```

./env.sh

```

  

3. Reload variables.

  

```

source ./env

```

  

## Execute command inside bin folder.

  

1. Grade student html css submissions

  

```

./grade_htmls_css_final.sh

```

  

2. Grade javascript submissions

  

```

./grade_jasmine_spec_repo.sh

```


## Executing commands in docker.

1. Update /student-grading-utils/grade.env with necessary data to download and grade student submissions.

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
docker build -t student-grading-utils .
```
3. Run the grading utils with this docker command.
```
docker run --env-file grade.env student-grading-utils
```