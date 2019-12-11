FROM node:12

USER root
# RUN apk update && apk upgrade && \
  # apk add --no-cache bash git openssh yarn
# RUN mkdir /app

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install -production

COPY . .

# RUN yarn build
# ENV NODE_ENV production

# RUN yarn install --production

EXPOSE 5000

# CMD ["node", "server.js"]
ENTRYPOINT ["node" , "server.js"]
# ---------------

