const mongoose = require("mongoose");

const candidateDocumentsShema = mongoose.Schema({
    id: {
        type: String
    },
    candidateId: {
        type: String
    },
    presentationLetter: {
        type: Buffer
    },
    curriculum: {
        type: Buffer
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    },
});

module.exports = mongoose.model('CandidateDocuments', candidateDocumentsShema);