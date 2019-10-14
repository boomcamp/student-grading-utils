#!/usr/bin/env bash

ouputDir="/ouput_dir/"
tmpDir="/tmp/"
customizedFile="customized.txt"

if [[ -d "$ouputDir" || -d "$tmpDir" ]]; then
  rm -rf ../tmp/*
  rm -rf ../output_dir/*
  echo "Resetting folder..."
else
  echo "Oops: Make sure these folders ${ouputDir} , ${tmpDir} exists."
  exit 1
fi

find ../ -type f -name $customizedFile -exec rm -f {} \;
