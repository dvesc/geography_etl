const mongoose = require('mongoose'),
  city_model = require('../models/city_model'),
  error_handler = require('../error/error_handler'),
  DTOValidationException = require('../error/DTOValidationException');

const create_city = async (city_dto, state_id) => {
  try {
    await city_model.create({
      name: city_dto.name,
      state: state_id,
      externals: [],
      extras: [],
      active: true,
      status: 'ready',
      created_by: mongoose.Types.ObjectId(process.env.DB_MODEL_CREATED_BY),
      _partitionKey: process.env.DB_MODEL_PARTITIONKEY,
    });
  } catch (e) {
    error_handler(new DTOValidationException(e), city_dto);
  }
};

module.exports = create_city;
