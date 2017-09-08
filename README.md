# Praïda Backend

## Development

- Install MongoDB
- Create a replica set: https://docs.mongodb.com/manual/tutorial/deploy-replica-set-for-testing/

```
mongod --port 27017 --dbpath /srv/mongodb/rs0-0 --replSet rs0 --smallfiles --oplogSize 128
mongod --port 27018 --dbpath /srv/mongodb/rs0-1 --replSet rs0 --smallfiles --oplogSize 128
mongod --port 27019 --dbpath /srv/mongodb/rs0-2 --replSet rs0 --smallfiles --oplogSize 128
```

## Deployment

`npm run deploy` launches `now` and copies the created url to the clipboard. This url must be added to the IP whitelist on MongoDB Atlas (or an alias)