FROM node:18-alpine AS builder
WORKDIR /app
COPY /*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["yarn", "run", "start:prod"]



