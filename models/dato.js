"use strict"

const mongoose = require("mongoose")

const datoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, index: true },
    temperature: { type: String },
    hour: { type: String},
    device: { type: String},
    gps: { type: String},
}, { autoIndex: false })

class DatoClass {
    update(dato){
        this.dato = dato;
    }
}

datoSchema.loadClass(DatoClass)
module.exports = mongoose.model("Dato", datoSchema)