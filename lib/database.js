const MongoClient = require('mongodb').MongoClient;
const { Parser } = require('json2csv');

const DB_NAME = 'PolishDB';
let cachedDb = null;

exports.connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

exports.downloadResource = (fields, data) => {
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(data);
  return csv;
}