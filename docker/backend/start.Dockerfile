FROM node:20.15
WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
COPY packages/types/package.json ./packages/types/package.json
COPY packages/backend/package.json ./packages/backend/package.json
#COPY packages/frontend/package.json ./packages/frontend/package.json

RUN yarn install --frozen-lockfile

COPY packages/types ./packages/types
COPY packages/backend ./packages/backend

WORKDIR /app/packages/types

RUN yarn build
WORKDIR /app/packages/backend

RUN yarn build


ARG PORT=5000
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD ["node", "dist/index.js"]