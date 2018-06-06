# Node + MongoDB Sample

## Introduction

This sample image implements a simple RESTful Web API for event- and participant management. It is implemented in Node.js and uses MongoDB to store data. I use this image in Docker and Kubernetes trainings.

## Quickstart

### Step 1

Pull the latest image:

```sh
docker pull rstropek/node-mongo-sample
```

### Step 2

This Web API will need a MongoDB to store data. If you don't have one, you can run it in a container:

```sh
docker run --name event-db -d mongo
```

### Step 2

Run the Web API:

```sh
docker run -e MONGO_URL=mongodb://event-db/member-management --link event-db -p 1337:80 -d --name event-api rstropek/node-mongo-sample
```

### Step 3

Try accessing the Web API. Here are some sample requests you can try:

```txt
GET http://localhost:1337/api/events?past=true
Accept: application/json

###
POST http://localhost:1337/api/events
Content-Type: application/json
Accept: application/json

{
    "date": "2018-03-21T00:00:00",
    "location": "Linz"
}

###
POST http://localhost:1337/api/events/5ab1f7783907dc5490a62a26/registrations
Content-Type: application/json
Accept: application/json

{
    "participant": 
    {
        "givenName": "John",
        "familyName": "Doe"
    }
}

###
GET http://localhost:1337/api/events/5ab1f7783907dc5490a62a26/registrations
Accept: application/json

###
POST http://localhost:1337/api/participants/5ab1f82465ab325e8356f183/checkin/5ab1f7783907dc5490a62a26
Content-Type: application/json
Accept: application/json
```
