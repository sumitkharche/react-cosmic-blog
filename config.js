const config = {
    app: {
      port: process.env.PORT || 5000
    },
    bucket : {
      slug: process.env.SLUG || '03ed2a30-a597-11e9-8965-1ff07c75b41d',
      write_key: process.env.WRITE_KEY ||'YOUR COSMIC WRITE KEY',
      read_key: process.env.READ_KEY ||' YOUR COSMIC READ KEY'
    }
  }
  
  module.exports = config;