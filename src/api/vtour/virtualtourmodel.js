const fs = require('fs');
const { Schema } = require('mongoose');
const restful = require("node-restful");
const mongoose = restful.mongoose;

const vtourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    owner: { type: String},
    areas: {
        position: { x: { type: Number, default: 0 }, y: { type: Number, default: 0 }, z: { type: Number, default: 0 }, class: {type: String, default: "vec3"} },
        area1: {type: Array}
    }
});

module.exports = restful.model('virtualtour', vtourSchema);