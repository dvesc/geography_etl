const mongoose = require('mongoose'),
  config = require('config'),
  error_handler = require('../error/error_handler'),
  DTOValidationException = require('../error/DTOValidationException');

const state_model = require('../models/state_model'),
  create_state = async (state_dto, country_id) => {
    try {
      const state_vo = await state_model.create({
        name: state_dto.name,
        code: state_dto.state_code,
        country: country_id,
        externals: [],
        extras: [],
        active: true,
        status: 'ready',
        created_by: mongoose.Types.ObjectId(config.get('db.model.created_by')),
        _partitionKey: config.get('db.model._partitionKey'),
      });

      return state_vo._id;
    } catch (e) {
      error_handler(new DTOValidationException(e), state_dto);
    }
  };

module.exports = create_state;
