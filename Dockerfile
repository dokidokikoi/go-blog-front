# 使用一个基础的 Node.js 镜像
FROM node:alpine as build

# 设置工作目录
WORKDIR /app

# 复制 Vue.js 项目的源代码到容器中
COPY . /app

# 安装依赖并构建前端应用
RUN npm install && npm run build

# 创建最终的生产镜像
FROM nginx:latest

# 将前端构建结果复制到 Nginx 的静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 Nginx 的默认端口
EXPOSE 443

# Nginx 启动命令
CMD ["nginx", "-g", "daemon off;"]
