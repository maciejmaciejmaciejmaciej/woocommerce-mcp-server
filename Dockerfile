FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080 # Or the port your server listens on - check the server's code!

CMD ["node", "build/index.js"]
