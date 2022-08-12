module.exports = class InternalError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = 500;
  }
};
