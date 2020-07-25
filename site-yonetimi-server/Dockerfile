FROM node:10.15 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:10.15-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4000
CMD ["npm", "run", "start:prod"]