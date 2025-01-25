FROM node:14

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
# CMD ["npm", "start"]

# dev-only
# CMD ["npm", "run", "dev"]