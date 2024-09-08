FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont
COPY package.json /app/
RUN npm install
COPY . /app/
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV CHROME_PATH=/usr/bin/chromium-browser
EXPOSE 5000
CMD [ "npm","start" ]