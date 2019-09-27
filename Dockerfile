FROM ubuntu

RUN apt-get update && apt-get install -yq libgconf-2-4

RUN apt-get -y install curl gnupg \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sL https://deb.nodesource.com/setup_11.x  | bash - \
    && apt-get -y install nodejs

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /student-grading-utils
COPY . /student-grading-utils
COPY package.json /student-grading-utils
RUN npm install
# RUN npm i --production

RUN npm install puppeteer-core chrome-aws-lambda --save-prod
RUN npm install puppeteer@1.11.0 --save-dev


VOLUME /student-grading-utils


ADD ${reference_image} .
COPY /bin/$checker /bin/
CMD chmod +x bin/$checker


ENTRYPOINT ./bin/$checker