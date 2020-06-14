FROM node:12

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
COPY ./package.json /src/package.json
RUN npm install

COPY ./nodemon.json /src/nodemon.json

EXPOSE 8080

CMD npm start