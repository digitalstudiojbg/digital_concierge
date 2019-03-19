# README

Digital Concierge Project

[![Build Status](https://travis-ci.org/digitalstudiojbg/digital_concierge.svg?branch=master)](https://travis-ci.org/digitalstudiojbg/digital_concierge)

## Technology Stack

-   REACT
-   REACT APOLLO
-   APOLLO CLIENT
-   EXPRESS
-   APOLLO SERVER
-   GRAPHQL
-   SEQUELIZE
-   MYSQL

## How do I start this project on my computer?

-   docker-compose up --build

## Project Ports

-   server => 3000
-   cms => 4000
-   tablet => 5000
-   touchscreen => 7000
-   clientcms => 9000

## Project Routes (dev)

-   localhost:3000 => server
-   localhost:3000/graphql => graphql api
-   localhost:4000 => cms project
-   localhost:5000 => tablet project
-   localhost:7000 => touchscreen project
-   localhost:9000 => clientcms project

## Project Routes (prod)

-   WEBSITE_URL/api => server
-   WEBSITE_URL/api/graphql => graphql api
-   WEBSITE_URL/ => cms_client project
-   WEBSITE_URL/cms => cms project
-   WEBSITE_URL/tablet => tablet project
-   WEBSITE_URL/touchscreen => touchscreen project

## Useful sequelize-cli commands

-   \$ node_modules/.bin/sequelize db:migrate
-   \$ node_modules/.bin/sequelize db:seed:all
-   \$ node_modules/.bin/sequelize migration:generate --name add-associations
-   \$ node_modules/.bin/sequelize seed:generate --name user
-   \$ node_modules/.bin/sequelize model:generate --name company --attributes name:string,description:text
-   \$ `console.log(Object.keys(select_directory.__proto__));)` //List of sequelize instance magic commands

## Useful docker commands

-   \$ docker ps
-   \$ docker-compose ps
-   \$ docker-compose up --build
-   \$ docker exec -it [CONTAINER_ID] sh
-   \$ docker system prune
-   Docker Error: no space left on device --> See (https://stackoverflow.com/a/37287054)
-   \$ docker volume rm \$(docker volume ls -qf dangling=true)

## CMS Test Admin Account

-   email: admin@admin.com.au
-   password: admin

## Tips:

-   If you have trouble for installing new packages via npm or yarn, please try to delete package-lock.json or yarn.lock and then restart docker.
-   If you receive error "ssh remote host identification has changed" when trying to ssh to AWS Server, please type [this command](https://stackoverflow.com/questions/20840012/ssh-remote-host-identification-has-changed) in the terminal (anywhere) \$ `ssh-keygen -R ec2-13-239-90-250.ap-southeast-2.compute.amazonaws.com`
