FROM node:8 AS build
ADD ./ /node-example
WORKDIR /node-example
RUN rm -rf frontend/dist
RUN npm install --only=prod
RUN npm run build
ENV PORT 80
ENV NODE_ENV production
EXPOSE 80
CMD ["node", "backend/server.js"]
