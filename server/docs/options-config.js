const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alias API',
      version: '1.0.0',
      description: 'Alias API for players, teams. You need to add your email in env variable ALLOWED_EMAILS (that email you can use for Invitation inside headers)'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./**/*.yaml']
}

module.exports = { options }