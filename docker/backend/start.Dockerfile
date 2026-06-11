FROM node:latest
WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY packages/backend/package.json ./packages/backend/package.json


RUN yarn install --frozen-lockfile


COPY packages/backend ./packages/backend

WORKDIR /app/packages/backend

RUN yarn build


ARG PORT=5000
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD ["node", "dist/index.js"]
