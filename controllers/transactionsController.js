const axios = require('axios');
const { getDB } = require('../config/db');

const listTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;

  
  if (!month || isNaN(month) || month < 1 || month > 13) {
    return res.status(400).send('Invalid month');
  }

  try {
    const skip = (page - 1) * perPage;

    
    if (parseInt(month) === 13) {
      const collection_ = getDB().collection('products');
      const transactions_ = await collection_
        .find()
        .skip(skip)
        .limit(parseInt(perPage))
        .toArray();

      if (search) {
      const priceSearch = Number(search);
      const filter = {
      $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
        ]
      };

      if (!isNaN(priceSearch)) {
        filter.$or.push({ price: priceSearch });
      }

      transactions_ = await collection_
        .find(filter)
        .skip(skip)
        .limit(parseInt(perPage))
        .toArray();
        
    }

      
      
      return res.status(200).json(transactions_);
    }

    
    const filter = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)]
      }
    };

    if (search) {
      const priceSearch = Number(search);
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
      if (!isNaN(priceSearch)) {
        filter.$or.push({ price: priceSearch });
      }
    }

    const collection = getDB().collection('products');
    const transactions = await collection
      .find(filter)
      .skip(skip)
      .limit(parseInt(perPage))
      .toArray();

    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving transactions');
  }
};

const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    const collection = getDB().collection('products');

    
    await collection.deleteMany({});

    
    await collection.insertMany(data);

    
    await collection.updateMany(
      { dateOfSale: { $type: "string" } },
      [
        {
          $set: {
            dateOfSale: {
              $dateFromString: { dateString: "$dateOfSale" }
            }
          }
        }
      ]
    );
    
    res.status(200).send('Database initialized with seed data');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error seeding the database');
  }
};

module.exports = { listTransactions, seedDatabase };
