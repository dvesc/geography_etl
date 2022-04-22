const fs = require('fs'),
  config = require('config'),
  init_mongo = require('../../db/mongo_conection'),
  upload_data = require('../services/upload_service'),
  error_handler = require('../error/error_handler'),
  FileNotFoundException = require('../error/FileNotFoundException');

(async function () {
  // Cuando se establesca la coneccion inicial...
  if (await init_mongo()) {
    const json_path = config.get('files.path');

    try {
      // Buscamos el json y comprobamos que exista
      const raw_data = fs.readFileSync(json_path),
        // filtra solo los paises indicados en la regexp
        filtered_countries = JSON.parse(raw_data).filter(
          country =>
            /^(united states|honduras|mexico|brazil)$/i.test(country.name) ===
            true
        );

      // Guardamos en la db
      upload_data(filtered_countries);
    } catch (err) {
      error_handler(new FileNotFoundException(json_path));
    }
  }
})();
