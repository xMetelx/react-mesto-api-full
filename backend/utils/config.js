module.exports = {
  env: process.env.NODE_ENV || 'development',
  serverDb: process.env.SERVER_DB,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  POST: process.env.PORT,
};
