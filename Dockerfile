FROM node:20.14.0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn install  

COPY . .

RUN npm run build

CMD ["npm", "run", "serve"]
