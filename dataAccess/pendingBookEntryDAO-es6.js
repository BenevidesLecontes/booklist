const ObjectId = require('mongodb').ObjectID;
const DAO = require('./DAO');

class PendingBookEntryDAO extends DAO {
    constructor(userId) {
        super();
        this.userId = userId;
    }
    async add(item){
        let db = await super.open();
        try {
            await db.collection('pendingEntries').insert(item);
        } finally {
            super.dispose(db);
        }
    }
    async remove(_id){
        let db = await super.open();
        try {
            await db.collection('pendingEntries').remove({ _id: ObjectId(_id) });
        } finally {
            super.dispose(db);
        }
    }
}

export default PendingBookEntryDAO;