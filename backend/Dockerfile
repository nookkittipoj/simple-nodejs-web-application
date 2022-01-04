FROM node:14.17.0

EXPOSE 3000

WORKDIR /app
COPY . /app
RUN npm install

USER node

# RUN npx sequelize db:migrate
CMD [ "npm", "start" ]