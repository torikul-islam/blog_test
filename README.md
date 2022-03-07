# Blog Prototype (NodeJS and MongoDb)

# Pre-requisites

- Install Docker
- Install Docker-compose

# Getting started

Clone the repository and get into the project directory
then run

```
docker-compose up --build
```

project running on port 3000 `(http://localhost:3000)`

- API endpoints

## blog

1. create blog - http://localhost:3000/blog - Method: POST
2. blog list - http://localhost:3000/blog - Method: GET
3. blog with paragraph(pagination) - http://localhost:3000/blog/id/paragraph - method: GET

## paragraph

1. create paragraph - http://localhost:3000/paragraph -- Method: POST
2. update paragraph - http://localhost:3000/paragraph/id -- Method: PUT
3. delete paragraph - http://localhost:3000/paragraph/id -- Method: DELETE

## comment

1. create paragraph comment - http://localhost:3000/blog/comment
