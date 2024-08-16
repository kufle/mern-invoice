ARG NODE_VERSION=20-alpine3.20

FROM node:${NODE_VERSION}

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm install

COPY . ${APP_HOME}

RUN npm run build

#EXPOSE 5173

#CMD ["npm","run","dev","--","--host"]