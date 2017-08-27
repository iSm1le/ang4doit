import * as mongoose from 'mongoose';

const markerSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number
});

const Marker = mongoose.model('Marker', markerSchema);

export default Marker;
