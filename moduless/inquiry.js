import { response } from "express";
import mongoose from "mongoose";
import statuses from "statuses";  // ✅ Fixed import
const message = statuses.message;

const inquirySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    phone: {
        type: Date,
        required: true,
        default: Date.now()
    },
    response: {
        type: String,
        required: false,
        default: ""
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    }
});

const inquiry = mongoose.model("Inquiry", inquirySchema);

export default inquiry;
