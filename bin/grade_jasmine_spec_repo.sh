#!/usr/bin/env bash

# printf "%s\n" ${students[@]} > dummy.txt
[ ! -d "$output_dir" ] && mkdir -p "$output_dir"
[ ! -d "$tmpdir" ] && mkdir -p "$tmpdir"
set -euo pipefail
errcho() {
  >&2 echo "$@";
}


read -p 'Do you want to select students? (y/N) ' myChoice
if [ $myChoice == "y" ]
then
  read -p 'number of students: ' studCount
  for ((c=1; c<=$studCount; c++))
  do
    read -p 'student name: ' student_list
    printf "%s\n" $student_list >> customized.txt
  done
  cp customized.txt student.txt
fi

while [[ $# -gt 0 ]]
  do
    key="$1"
    case $key
      in
      -o|--output)
        output_dir=$(cd "$2"; pwd -P);
        shift
        shift
        ;;
      -r|--repo)
        repo=$2;
        shift
        shift
        ;;
      -b|--branch)
        branch=$2;
        shift
        shift
        ;;
       --)
         shift; break;;
    esac
  done

# echo ${studentsp[@]} > student.txt

cd "${BASH_SOURCE%/*}" || exit

errcho "Repos will be output to $output_dir"

# Download submissions
 ../utils/downloadPullRequestRepos.js \
   --output "$tmpdir" \
   --repo "$repo" \
   --branch "$branch" \
   --studentList "$studentList" \
   | xargs -I{} tar -xf {} -C "$output_dir"

# Run jasmine console reporter
../utils/gradeJasmineSpecRepo.js \
  --directories "$output_dir" \
  --submissions "$submissions"

# TODO: Empty folder command 
Runreset="$execfile"
("$Runreset")