#!/usr/bin/env bash

# Initial set-Up
export branch=submission
export repo=https://github.com/boomcamp/javascript-2-arrays
export BASH_SOURCE=/bin/bash
export all_students=false

# Folders
export output_dir=/home/dev-mentor/Downloads/student-grading-utils/output_dir
export tmpdir=/home/dev-mentor/Downloads/student-grading-utils/tmp #/var/tmp

# Reference image to compare for grade_html_css_final.sh
export reference_image=/home/dev-mentor/Downloads/student-grading-utils/final_1366x768.png

# The output_dir/ folder inside student-grading-utils/ folder
export submissions=/output_dir/

# reset folder(s)
export execfile=/home/webdev/Desktop/student-grading-utils/bin/reset.sh