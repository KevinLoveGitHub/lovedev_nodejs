FROM node:8.10.0
# 注册模块镜像
RUN npm set registry https://registry.npm.taobao.org \
    # node-gyp 编译依赖的 node 源码镜像
    && npm set disturl https://npm.taobao.org/dist \
    # 清空缓存
    && npm cache clean --force \
    && npm install -g pm2 \
    && mkdir -p /root/lovedev
WORKDIR /root/lovedev
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8888
CMD ["npm", "run", "start"]
CMD tail -f app.js
