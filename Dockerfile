FROM nginx:alpine
MAINTAINER Ed Asriyan <ed-asriyan@protonmail.com>

RUN apk update && apk add --no-cache nodejs; if ! type "npm" > /dev/null; then apk add --no-cache npm; fi

ARG MODE=default
RUN if [ ${MODE} == 'default' ]; then \
      apk add --no-cache git && \
      git clone --depth=1 https://github.com/M4MController/frontend-landing.git /usr/html/landing && \
      rm -rf usr/html/landing/.git; \
      fi

WORKDIR /application

# install dependencies
ADD package.json .
RUN npm i

# build the app
ADD .eslintrc.js .
ADD ember-cli-build.js .
ADD config ./config
ADD app ./app
ADD public ./public
ADD translations ./translations

ARG GOOGLE_API_MAPS_KEY

RUN npm run build -- --environment=production

# copy generated files
RUN mkdir -p /usr/html/ && cp -R dist/. /usr/html/account/

# remove unnecessary source files
RUN rm -fr /application
RUN apk del nodejs npm git

ADD config/nginx-${MODE}.conf /etc/nginx/nginx.conf
