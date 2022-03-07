FROM node:16.13.0
WORKDIR /app
RUN npm i npm@latest -g
RUN npm cache clean --force
RUN rm -rf ~/.npm
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000