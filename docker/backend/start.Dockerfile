FROM node:24
WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY packages/backend/package.json ./packages/backend/package.json


RUN corepack enable
RUN yarn install --immutable


COPY packages/backend ./packages/backend

WORKDIR /app/packages/backend

RUN yarn build


ARG PORT=5000
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD ["node", "dist/index.js"]
