# PhotoStack - [![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

PhotoStack is an innovative and easy to use personal photo collection service. It uses AI techniques to order and categorise photos without any help from the user.

## Motivation


## Status
The project is currently under active development.
- [X] Develop MVP
- [ ] Add tests
- [ ] Deploy service to AWS
- [ ] Add types to frontend codebase
- [ ] Setup CI/CD pipeline
- [ ] Setup LetsEncrypt cert

## Frameworks used

### Frontend

* [Bulma](https://bulma.io/)
* [React](https://reactjs.org/)

### Backend

* [nginx](https://nginx.org/en/) - Serves compiled react/frontend code, proxy request to Flask/Restify
* [Node.js](https://nodejs.org/en/) - Express.js for REST API, Apollo GraphQL used for GraphQL API. Most of the actual business logic and job distribution is to be done here.
* [Apollo GraphQL](https://www.apollographql.com/) - GraphQL library
* [Python](https://www.python.org/) - Consumes jobs to do work with ML libraries
* [Redis](https://redis.io/) - Job queue, i.e. images to process
* [MinIO](https://minio.io/) - Object (image) storage system
* [MongoDB](https://www.mongodb.com/) - Storing metadeta and references to objects

## License

PhotoStack is [BSD 3-Clause licensed](https://github.com/claudiosv/PhotoStack/blob/master/LICENSE).
