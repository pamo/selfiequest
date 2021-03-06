module.exports = {
  knox: {
      settings: {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: 'selfiequestdev'
      }
  },
  aws: {
    targetFolder: process.env.AWS_FOLDER || "default",
    environment: process.env.ENVIRONMENT || "dev",
    startGame: process.env.START_GAME || "false"
  },
  security: {
    salt: process.env.SALT || "a3jcLj3kaB",
    adminPassword: process.env.ADMIN_PASSWORD || "iceland"
  }
};
