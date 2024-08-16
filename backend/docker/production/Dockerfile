ARG NODE_VERSION=20-alpine3.20

FROM node:${NODE_VERSION}

LABEL name="mern-invoice"
LABEL license="MIT"
LABEL description="MERN invoice image"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

#RUN addgroup --system invoice \
#    && adduser --system --ingroup invoice invoice

COPY package*.json ./

RUN npm install

#COPY --chown=invoice:invoice . ${APP_HOME}
COPY --chown=node:node . ${APP_HOME}

#RUN chown -R invoice:invoice ${APP_HOME}
RUN chown -R node:node ${APP_HOME}

#USER invoice
USER node

CMD [ "npm", "run", "start" ]