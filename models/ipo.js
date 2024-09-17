const mongoose = require("mongoose");
const { Schema } = mongoose;

const ipoSchema = new Schema({
    name: String,
    offerDate: String,
    offerPrice: String,
    lotSize: String,
    subscriptions: String,
    expectedPrem: String,
    openDate: String,
    closeDate: String,
    allotmentDate: String,
    listingDate: String,
    faceValue: String,
    issuePrice: String,
    issueSize: String,
    marketLot: String, 
    listingAt: String,
    retailPartition: String,
    isLive: Boolean,
    isListed: Boolean
})
