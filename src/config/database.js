const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

module.exports = mongoose.connect('mongodb://localhost:27017/vtour', { 
    useNewUrlParser: true,
    useUnifiedTopology: true}
);
