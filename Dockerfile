FROM node:11-alpine

RUN apk add --no-cache bash
RUN apk add --no-cache curl 

RUN apk add --update nodejs npm

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser
RUN apk add --nocache udev ttf-freefont chromium git

WORKDIR /student-grading-utils
COPY . /student-grading-utils
COPY package.json /student-grading-utils
RUN npm install 
RUN npm install --save puppeteer@1.11.0

VOLUME /student-grading-utils
ADD $reference_image /student-grading-utils
COPY /bin/$checker /bin/
CMD chmod +x bin/$checker

ENTRYPOINT ./bin/$checker   