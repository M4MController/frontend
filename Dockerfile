FROM smebberson/alpine-nginx-nodejs
MAINTAINER Ed Asriyan <ed-asriyan@protonmail.com>

WORKDIR /application

# install dependencies
ADD package.json .
RUN npm install

# build the app
ADD .eslintrc.js .
ADD ember-cli-build.js .
ADD config ./config
ADD app ./app
ADD public ./public
ADD mirage ./mirage
ADD nginx.conf /etc/nginx/nginx.conf

RUN npm run build -- --environment=production

# copy generated files
RUN cp -R dist/. /usr/html/

# remove unnecessary source files
RUN rm -fr /application

# remove unnecessary source files
RUN rm -fr /application

EXPOSE 80
