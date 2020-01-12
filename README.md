# M4M Web App [![Build Status](https://travis-ci.org/M4MController/frontend.svg?branch=master)](https://travis-ci.org/M4MController/frontend) [![Greenkeeper badge](https://badges.greenkeeper.io/M4MController/frontend.svg)](https://greenkeeper.io/)

## Running the app
At first clone the repository:
```bash
$ git clone git@github.com:m4mController/frontend.git && cd frontend
```

### Set environment variables
* `SERVER`. **Ignored with `npm run build`!** Default: `backend`. Possible values:
  * `backend`: frontend will be targeted to the real backend (meter4.me). 
  * `proxy`: local proxy server to the backend will be started. Good for local deploying.
  * `mock`: local mock server will be started. Good for deploying without internet access.
* `MODE`. Default: `default`. Possible values:
  * `default`: frontend for meter4.me will be build.
  * `lite`: frontend for controller will be build.
* `BACKEND_API`. Backend 
  
Now you can build and run the app, there are several ways to do it:

### Using docker
1. Build the docker image:
```bash
$ docker build -t m4m-frontend .
```

2. Run a container (replace `<PORT>` with port you want to listen):
```bash
$ docker run -p <PORT>:80 m4m-frontend
```

Open `http://localhost:<PORT>` in the browser.

### Using npm & node.js
1. It requires [Node.js](https://nodejs.org/) with npm. Install them.

2. Install dependencies:
```bash
$ npm install
```

3. Run the server (replace `<PORT>` with port you want to listen):
```bash
$ PORT=<PORT> npm start
```
And open `http://localhost:<PORT>` in the browser.


### Using a server
1. It requires [Node.js](https://nodejs.org/) with npm. Install them.

2. Install dependencies:
```bash
$ npm install
```

3. Generate bundle:
```bash
$ npm run build
```

Generated files are located in `dist/` directory. For it to work
properly, you should use them and `public/` as static files on your
server. Do it manually, or do the following to run with nginx:

4. Install [nginx](https://nginx.org).

5. Copy generated files:
```bash
cp -R dist/. /usr/html/
```

6. Copy static files:
```bash
cp -R public/. /usr/html/
```

6. Copy nginx config:
```bash
cp nginx.conf /etc/nginx/nginx.conf
```

7. Restart nginx:
```bash
sudo service nginx restart
```

Open `http://localhost` in the browser
