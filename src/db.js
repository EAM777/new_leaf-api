import mongoose from 'mongoose';
import config from './config';

export default callback => {
  mongoose.Promise = Promise; 
  let db = mongoose.connect(config.mongoUrl,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useCreateIndex', true);
  callback(db);
}
