FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build TS
RUN npm run build

EXPOSE 3000

# Run the compiled JS directly
CMD ["node", "dist/index.js"]
