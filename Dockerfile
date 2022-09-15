FROM  node
# gets node image from docker

WORKDIR /usr/app
# set this as the folder where docker will bestored

COPY package.json ./
# copies package.json ./ inside the directorty

RUN npm install --force
# download package.json dependencies

COPY . .
# copies everything to inside our root folder

EXPOSE 3333
#local:host:3333

CMD ["npm", "run", "dev" ]
#starts our server

