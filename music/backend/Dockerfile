FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./src /app/src

EXPOSE 4000

CMD ["npm","run","dev"]