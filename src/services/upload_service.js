const error_handler = require('../error/error_handler'),
  create_state = require('./state_services'),
  create_city = require('./city_services'),
  create_country = require('./country_services');

const upload_data = async data_dto => {
  try {
    console.log('uploading data...');

    // por cada pais filtrado
    data_dto.forEach(async country_dto => {
      const country_id = await create_country(country_dto);
      if (country_id) {
        // Por cada estado
        country_dto.states.forEach(async state_dto => {
          const state_id = await create_state(state_dto, country_id);
          if (state_id)
            // Por cada ciudad
            state_dto.cities.forEach(async city_dto =>
              create_city(city_dto, state_id)
            );
        });
      }
    });
    console.log('Countries-states-cities data has been uploaded on mongo db');
  } catch (e) {
    error_handler(e);
  }
};

module.exports = upload_data;
