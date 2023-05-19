FROM node:18.10
 
WORKDIR /usr/src/app
 
COPY ./frontend/package*.json ./
 
RUN npm install
 
COPY ./frontend .
 
EXPOSE 8000
 
CMD [ "npm", "run", "dev","--", "--host", "--port", "8000" ]