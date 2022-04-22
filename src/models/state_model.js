const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose,
  external = Schema(
    {
      platform: { type: String, default: '' },
      platform_id: { type: String, default: '' },
      registered_at: { type: Date, default: null },
    },
    { supressReservedKeysWarning: true }
  ),
  values = new Schema(
    {
      value_id: { type: ObjectId, default: null },
      value: { type: String, default: '' },
      value_type: { type: String, default: '' },
      collection: { type: String, default: null },
    },
    { _id: false, supressReservedKeysWarning: true }
  ),
  extra = new Schema(
    {
      key: { type: String, default: '' },
      updated_at: { type: Date, default: Date.now },
      values: [values],
    },
    { _id: false, supressReservedKeysWarning: true }
  ),
  state_schema = new Schema(
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      country: { type: ObjectId, default: null },
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
  state_model = mongoose.model('states', state_schema);

module.exports = state_model;
