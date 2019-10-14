import ClientStore from '../dataAccess/client-store';
import * as express from 'express';
import * as mongodb from 'mongodb';
import EventStore from '../dataAccess/event-store';
import ParticipantStore from '../dataAccess/participant-store';
import RegistrationStore from '../dataAccess/registration-store';

function addDataContext(mongoUrl: string, dbName: string, app: express.Express, cb: () => void) {
    mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        const dbi = db.db(dbName);
        (<any>app).dc = {
            db: db,
            events: new EventStore(dbi.collection("events")),
            participants: new ParticipantStore(dbi.collection("participants")),
            registrations: new RegistrationStore(dbi.collection("registrations")),
            clients: new ClientStore(dbi.collection("clients"))
        };
        cb();
    });
}

export default addDataContext;