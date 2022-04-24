const mongoose = require('mongoose'),
  country_model = require('../models/country_model'),
  error_handler = require('../error/error_handler'),
  DTOValidationException = require('../error/DTOValidationException');

const create_country = async country_dto => {
  try {
    const names = [];
    // por cada lenguaje en la env creamos un 'name schema'
    process.env.DB_MODEL_LANGUAGE.split('|').forEach(language => {
      let value;
      // Si el idioma es "default" o "en" el valor sera 'country.name' si no, es una propiedad dinamica
      if (/^(default|en)$/i.test(language)) value = country_dto.name;
      else value = country_dto.translations[`${language}`];

      names.push({
        description: '',
        value,
        language,
      });
    });

    const country_vo = await country_model.create({
      slug: country_dto.name.toLowerCase(),
      names,
      capital: country_dto.capital,
      currency: country_dto.currency,
      currency_name: country_dto.currency_name,
      currency_symbol: country_dto.currency_symbol,
      externals: [
        {
          platform: 'iso3',
          platform_id: country_dto.iso3,
        },
        {
          platform: 'iso2',
          platform_id: country_dto.iso2,
        },
      ],
      extras: [
        {
          key: 'numericCode',
          values: [
            {
              value: country_dto.numeric_code,
              value_type: 'numeric',
            },
          ],
        },
        {
          key: 'phoneCode',
          values: [
            {
              value: country_dto.phone_code,
              value_type: 'numeric',
            },
          ],
        },
      ],
      active: true,
      status: 'ready',
      created_by: mongoose.Types.ObjectId(process.env.DB_MODEL_CREATED_BY),
      _partitionKey: process.env.DB_MODEL_PARTITIONKEY,
    });

    return country_vo._id;
  } catch (e) {
    error_handler(new DTOValidationException(e), country_dto);
  }
};

module.exports = create_country;
