class DTOValidationException extends Error {
  status;

  name;

  cause;

  constructor(message, dto) {
    super(message);
    this.status = 400;
    this.name = 'DTOValidationException';
    this.value = dto;
  }
}

module.exports = DTOValidationException;
