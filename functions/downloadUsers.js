const database = require('../lib/database');
const MONGODB_URI = process.env.MONGODB_URI;

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await database.connectToDatabase(MONGODB_URI);
  const clients = await db.collection("clients").find({}).toArray();
  const fields = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Phone Number',
      value: 'phoneNumber'
    }
  ];
  const csv = database.downloadResource(fields, clients);

  return {
    headers: {
      'Content-Type': 'text/csv',
      'Content-disposition': 'attachment; filename=testing.csv'
    },
    body: csv,
    statusCode: 200
  }
};