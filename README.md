
## Intro

Simple back-end auth app based on Layer architecture:

https://drive.google.com/file/d/1QtT0Yl-cfpJdPKBspqrdPWZ5XjX_NEte/view?usp=sharing

NOTE: Redis used as a data storage for users, pls see 2 page (RadisDB) link above


## Installation

It is required Docker to run the API,

To run Redis:
$ docker-compose -f docker-compose-redis-only.yml up

To run app:
$ npm run dev

## Supported routes

http://localhost:8000/users/register
http://localhost:8000/users/login
http://localhost:8000/users/info
