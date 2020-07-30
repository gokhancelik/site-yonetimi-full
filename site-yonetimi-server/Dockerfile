FROM node:12 AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build


FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4000
CMD ["npm", "run", "start:prod"]