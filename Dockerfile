FROM node:8.10.0
RUN npm install -g pm2
RUN mkdir -p /root/lovedev
WORKDIR /root/lovedev
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8888
CMD ["npm", "run", "start"]
