const {faker} = require('@faker-js/faker');
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://abhinash:RM9kbbdRzvixqLNm@cluster0.pjkpwml.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function generateAndInsertFakeData() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('final_project');
    const collection = db.collection('books');

    const records = [];
    const numRecords = 1000;

    for (let i = 0; i < numRecords; i++) {
      const book = {
        _id: new ObjectId(),
        title: faker.lorem.words(),
        author: faker.person.fullName(),
        genre: faker.helpers.arrayElement(['Science Fiction', 'Mystery', 'Romance', 'Fantasy', 'Thriller']),
        publishedYear: faker.number.bigInt({ min: 1900, max: 2023 })
      };

      records.push(book);
    }

    await collection.insertMany(records);
    console.log(`Inserted ${numRecords} records into the collection`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

generateAndInsertFakeData();
