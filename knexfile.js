// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Password123',
      database: 'test'
    }
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Password123',
      database: 'test'
    }
  }
}
