const mongoose = require('mongoose');
const data = require("../models/dato")

module.exports = {
    init: () => {
        const mongoDB = process.env.MONGO_URL
        mongoose.connect(mongoDB, {
            useNewUrlParser: true
        })

        mongoose.Promise = global.Promise
        mongoose.set('useCreateIndex', true)

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'MongoDB connection error:'))
        db.once('open', () => {
            console.log("Conectado a mongoDB")
        })
    },

    addDato(dato) {
        return new Promise((res, rej) => {
            data.create({
                id: dato.id,
                temperature: dato.temperature,
                hour: dato.hour,
                device: dato.device,
                gps: dato.gps
            }).then(doc => {
                res(doc)
            }).catch(err => {
                rej(err)
            })
        })
    },

    updateDato(dato) {
        return new Promise((res, rej) => {
            data.update({id : dato.id},{
                id: dato.id,
                temperature: dato.temperature,
                hour: dato.hour,
                device: dato.device,
                gps: dato.gps
            }).then(doc => {
                res(doc)
            }).catch(err => {
                rej(err)
            })
        })
    },

    deleteDato(id) {
        return new Promise((res, rej) => {
            data.deleteOne({id : id}).then(doc => {
                res(doc)
            }).catch(err => {
                rej(err)
            })
        })
    }

}