# README #
[![Build Status](https://travis-ci.org/digitalstudiojbg/digital_concierge.svg?branch=master)](https://travis-ci.org/digitalstudiojbg/digital_concierge)

Digital Concierge Project

## Technology Stack ##
* REACT
* REACT APOLLO
* APOLLO CLIENT 
* EXPRESS
* APOLLO SERVER
* GRAPHQL
* SEQUELIZE
* MYSQL

## How do I start this project on my computer? ##
* docker-compose up --build

## Project Ports ##
* server => 3000 
* cms => 4000
* tablet => 5000
* touchscreen => 7000

## Project Routes (DEV) ##
* localhost:3000 => server 
* localhost:3000/graphql => graphql api 
* localhost:4000 => cms project 
* localhost:5000 => tablet project  
* localhost:7000 => touchscreen project 

## Project Routes (PROD) ##
* WEBSITE_URL/api => server 
* WEBSITE_URL/api/graphql => graphql api 
* WEBSITE_URL/ => cms project 
* WEBSITE_URL/tablet => tablet project  
* WEBSITE_URL/touchscreen => touchscreen project 
  
## Useful sequelize-cli commands ##
* $ node_modules/.bin/sequelize db:migrate
* $ node_modules/.bin/sequelize db:seed:all
* $ node_modules/.bin/sequelize migration:generate --name add-associations
* $ node_modules/.bin/sequelize seed:generate --name user
* $ node_modules/.bin/sequelize model:generate --name company --attributes name:string,description:text

## Useful docker commands ##
* $ docker ps
* $ docker-compose ps
* $ docker-compose up --build
* $ docker exec -it [CONTAINER_ID] sh

## CMS Test Admin Account ##
* email: admin@admin.com.au
* password: admin