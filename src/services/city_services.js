const mongoose = require('mongoose'),
  config = require('config'),
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
      created_by: mongoose.Types.ObjectId(config.get('db.model.created_by')),
      _partitionKey: config.get('db.model._partitionKey'),
    });
  } catch (e) {
    error_handler(new DTOValidationException(e), city_dto);
  }
};

module.exports = create_city;
