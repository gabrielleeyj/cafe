FROM node:18

# Set the Current Working Directory inside the container
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Copy the .env file
COPY .env .env

CMD ["node", "app.js"]
