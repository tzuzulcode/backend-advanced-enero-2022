FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ./src /app/src

RUN npx prisma init
COPY ./prisma /app/prisma

EXPOSE 4000

CMD ["npm","run","dev"]