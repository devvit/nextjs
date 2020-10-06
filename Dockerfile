FROM node:lts-alpine

RUN apk add --no-cache \
  bash \
  procps \
  && apk add --no-cache --virtual .build-deps build-base linux-headers musl-dev

COPY . /app
RUN chmod 777 /app
WORKDIR /app

RUN cd /app && npm i && node_modules/.bin/next build

RUN apk del .build-deps

RUN adduser -D tomcat
USER tomcat
EXPOSE 8080
ENTRYPOINT /app/entrypoint.sh
