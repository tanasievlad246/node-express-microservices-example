FROM node:16.3.0-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
RUN unset NODE_OPTIONS
# ENV NODE_OPTIONS="--openssl-legacy-provider"
EXPOSE 3000
COPY ./ ./

CMD ["npm", "start"]