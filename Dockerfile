# stage1 - build react app
FROM node:14-alpine AS builder

WORKDIR /app
ENV PATH="./node_modules/.bin:$PATH"
ARG API_BASE_URL
ENV REACT_APP_API_BASE_URL=$API_BASE_URL
COPY package.json yarn.lock ./
RUN yarn --silent
COPY . ./
RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.19-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx/nginx.conf /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /app/build /usr/share/nginx/html