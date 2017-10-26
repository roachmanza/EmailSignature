FROM node:alpine

WORKDIR /usr/src/app
# Install app dependencies
#COPY package.json .

# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

# RUN npm set registry http://momjendev102.metmom.mmih.biz:8082/repository/npm-group/ 
RUN npm install


# Bundle app source
COPY . .

EXPOSE 4010

CMD [ "npm", "start" ]