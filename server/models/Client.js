/*
bring in mongoose 
creating a mongoose schema
a mongoose schema is not related to a graphql schema
you  have th database and in top the mongoose schema (layer, object mapper layer) where we create
a schema that includes the fields for our database colection
and on top of that is our graphql schema, our graphql api.
*/
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
});

// export it like a mongoose module
module.exports = mongoose.model('Client', ClientSchema);
