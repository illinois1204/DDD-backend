FROM node:21-alpine

WORKDIR /src/app
COPY . .
RUN npm ci --omit=dev
RUN npm run build
EXPOSE 5000
CMD [ "sh", "-c", "npm run migrate:sql:up && npm run start" ]
