const virtualTourModel = require('./virtualtourmodel');

virtualTourModel.methods(['get', 'post', 'put', 'delete']);
virtualTourModel.updateOptions({ new: true, runValidators: true });

module.exports = virtualTourModel;