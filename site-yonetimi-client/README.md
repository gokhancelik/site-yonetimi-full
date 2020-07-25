# SiteYonetimiClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker build

docker build -t registry.gitlab.com/zelektronik/site-yonetimi-applications/site-yonetimi-full/client:latest .

## Docker Push Gitlab

docker push registry.gitlab.com/zelektronik/site-yonetimi-applications/site-yonetimi-full/client

## Docker virtual host

docker run -d --name aidat-takip-demo-client --expose 80 --net nginx-proxy -e VIRTUAL_HOST=aidattakip.site registry.gitlab.com/zelektronik/site-yonetimi-applications/site-yonetimi-full/client:latest

docker run --detach --name cigdem-adasi-client --env "VIRTUAL_HOST=cigdemadasi.turkuazvadisi.com" --env "LETSENCRYPT_HOST=cigdemadasi.turkuazvadisi.com" --expose 80 registry.gitlab.com/zelektronik/site-yonetimi-applications/site-yonetimi-full/client:latest