const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId, // when you create a new record in colecction always is gonna have assigned an objectid automatically.
        ref: 'Client', // i want to have it realted to other model
    },
});

// export it like a mongoose module
module.exports = mongoose.model('Project', ProjectSchema);