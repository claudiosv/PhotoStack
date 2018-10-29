# PhotoStack
Frontend

ml5.js

reactjs

Backend

nginx - Serves compiled react/frontend code, proxy request to Flask/Restify

Nodejs - Restify for REST API, most of the actual business logic and job distribution is to be done here.

Python - Flask for REST API, consumes jobs to do work with ML libraries

RabbitMQ or Redis - Job queue, i.e. images to process

Minio - Object (image) storage system

Mongodb - Storing metadeta and references to objects
