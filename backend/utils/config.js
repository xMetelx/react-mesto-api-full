module.exports = {
  env: process.env.NODE_ENV || 'development',
  serverDb: process.env.SERVER_DB || 'mongodb://localhost:27017/mestodb',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  PORT: process.env.PORT,
};
