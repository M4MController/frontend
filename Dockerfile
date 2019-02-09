FROM nginx:alpine
MAINTAINER Ed Asriyan <ed-asriyan@protonmail.com>

RUN apk update && apk add nodejs
RUN if ! type "npm" > /dev/null; then apk add npm; fi

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

RUN npm run build -- --environment=production

# copy generated files
RUN cp -R dist/. /usr/html/

# remove unnecessary source files
RUN rm -fr /application

# remove unnecessary source files
RUN rm -fr /application

ADD nginx.conf /etc/nginx/nginx.conf
