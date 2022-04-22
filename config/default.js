require('dotenv').config();

const env = process.env.NODE_ENV, // 'dev' o 'test'
  dev = {
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      model: {
        created_by: process.env.DB_MODEL_CREATED_BY,
        _partitionKey: process.env.DB_MODEL_PARTITIONKEY,
        language: process.env.DB_MODEL_LANGUAGE || 'default|es|en|pt',
      },
    },
    files: {
      path: process.env.FILES_PATH,
    },
  },
  config = {
    dev,
  };

module.exports = config[env];
