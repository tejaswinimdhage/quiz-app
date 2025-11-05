import mongoose from "mongoose";

// Define schema for individual question
const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least 2 options']
    },
    correctAnswer: {
        type: String,
        required: true,
    },
});

// Custom validator to ensure at least 2 options
function arrayLimit(val) {
    return val.length >= 2;
}

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [questionArrayLimit, '{PATH} must have at least 1 question']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

function questionArrayLimit(val) {
    return val.length > 0;
}

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;