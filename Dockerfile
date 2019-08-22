FROM nginx:alpine
MAINTAINER Ed Asriyan <ed-asriyan@protonmail.com>

RUN apk update && apk add nodejs; if ! type "npm" > /dev/null; then apk add npm; fi

WORKDIR /application

# install dependencies
ADD package.json .
ADD package-lock.json .
RUN npm install

# build the app
ADD .eslintrc.js .
ADD ember-cli-build.js .
ADD config ./config
ADD app ./app
ADD public ./public
ADD translations ./translations

ARG GOOGLE_API_MAPS_KEY
ARG MODE=default

RUN npm run build -- --environment=production

# copy generated files
RUN mkdir /usr/html && cp -R dist/. /usr/html/account/

# remove unnecessary source files
RUN rm -fr /application

ADD nginx-${MODE}.conf /etc/nginx/nginx.conf
