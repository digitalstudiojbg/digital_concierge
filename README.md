# README #
Digital Concierge Project

## Technology Stack ##
* REACT
* APOLLO CLIENT 
* EXPRESS
* APOLLO SERVER
* GRAPHQL
* SEQUELIZE
* MYSQL

## How do I start this project? ##
* docker-compose up --build
* go to localohost:3050/

## Project Ports ##
* server: 3000 
* cms: 4000
* tablet: 5000
* touchscreen: 6000

## Project Routes ##
* localhost:3050/ => cms site 
* localhost:3050/cms => cms site  
* localhost:3050/tablet => tablet site 
* localhost:3050/api => graphql api 

## Useful sequelize-cli commands ##
* $ node_modules/.bin/sequelize init
* $ node_modules/.bin/sequelize db:migrate
* $ node_modules/.bin/sequelize migration:generate --name add-associations
* $ node_modules/.bin/sequelize model:generate --name company --attributes name:string,description:text
* $ node_modules/.bin/sequelize db:seed:all
* $ node_modules/.bin/sequelize seed:generate --name user

## CMS Test Admin Account ##
* email: admin@admin.com.au
* password: admin