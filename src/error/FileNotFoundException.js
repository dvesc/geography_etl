class FileNotFoundException extends Error {
  status;

  name;

  constructor(path) {
    super(`json file not found in set path '${path}'`);
    this.status = 404;
    this.name = 'FileNotFoundException';
  }
}

module.exports = FileNotFoundException;
