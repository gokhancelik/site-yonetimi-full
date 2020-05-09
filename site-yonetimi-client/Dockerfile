FROM node:10.15 AS builder
WORKDIR /site-yonetimi-client

COPY . .

#Angular kurulumu sırasında telemetri toplamak için onay isteniyor.
#Onay promt build işlemini askıya aldığı için default No onayı veriyoruz.
#RUN echo 'N' | npm install && ng config -g cli.warnings.versionMismatch false  &&  node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build -c ValetudoTest
RUN echo 'N' | npm install -g @angular/cli --verbose && echo 'N' | npm ci && ng build --prod


FROM nginx:1.17.10-alpine AS publish
COPY --from=builder /site-yonetimi-client/dist/site-yonetimi-client /var/www/site-yonetimi-client
COPY ["nginx.conf", "/etc/nginx/"]