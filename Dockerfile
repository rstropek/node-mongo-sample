FROM node:12 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist/
RUN npm install --production
ENV MONGO_URL=mongodb://mongo-server/member-management
ENV port=80
EXPOSE 80
CMD ["node", "./dist/server.js"]
