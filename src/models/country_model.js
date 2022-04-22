const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose,
  names = new Schema(
    {
      description: { type: String, default: '' },
      value: { type: String, required: true },
      language: { type: String, required: true },
    },
    { _id: false, supressReservedKeysWarning: true }
  ),
  values = new Schema(
    {
      value_id: { type: ObjectId, default: null },
      value: { type: String, required: true },
      value_type: { type: String, required: true },
      collection: { type: String, default: null },
    },
    { _id: false, supressReservedKeysWarning: true }
  ),
  extra = new Schema(
    {
      key: { type: String, required: true },
      updated_at: { type: Date, default: Date.now },
      values: [values],
    },
    { _id: false, supressReservedKeysWarning: true }
  ),
  external = new Schema(
    {
      platform: { type: String, required: true },
      platform_id: { type: String, required: true },
      registered_at: { type: Date, default: Date.now },
    },
    { supressReservedKeysWarning: true }
  ),
  countries_schema = new Schema(
    {
      slug: { type: String, required: true },
      names: [names],
      capital: { type: String },
      currency: { type: String, required: true },
      currency_name: { type: String, required: true },
      currency_symbol: { type: String, required: true },
      externals: [external],
      extras: [extra],
      active: { type: Boolean, required: true },
      status: { type: String, required: true },
      created_by: { type: ObjectId, required: true },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
      deleted_at: { type: Date, default: null },
      _partitionKey: { type: String, required: true },
    },
    { versionKey: false, supressReservedKeysWarning: true }
  ),
  country_model = mongoose.model('countries', countries_schema);

module.exports = country_model;
