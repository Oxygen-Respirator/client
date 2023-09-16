# FROM node:18-alpine
FROM --platform=linux/amd64 node:18-alpine

RUN mkdir /app
WORKDIR /app
# RUN mkdir ./dist
# ADD ./dist ./dist
ADD . /app

COPY ./package.json /package.json 
COPY ./yarn.lock /yarn.lock 

RUN yarn

# EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 43000

CMD ["yarn","serve"]