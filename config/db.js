const mongoose = require('mongoose')
const config = require('./config')

module.exports = async () => {
  const connect = await mongoose.connect(config.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(conn => console.log(`DataBase succsessful connected ${conn.connection.host}`))
  .catch(err => console.log(`DataBase error ${err}`))
}
