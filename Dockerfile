FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx tsc

CMD ["node", "./dist/app.js"]
