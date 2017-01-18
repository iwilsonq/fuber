const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/fuber_test');
  mongoose.connection
    .open('open', () => done())
    .on('error', err => {
      console.warn('Warning', err)
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop(() => {
    drivers.ensureIndex({ 'geometry.coordiates': '2dsphere' })
      .then(() => done())
      .catch(() => done());
  });
});
