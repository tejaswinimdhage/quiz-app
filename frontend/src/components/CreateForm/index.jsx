import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreateForm = () => {
    const navigate = useNavigate();
    const [quizName, setQuizName] = useState("");
    const [questions, setQuestions] = useState([
        { questionText: "", options: ["", ""], correctAnswer: "" },
    ]);

    // Add a new question
    const addQuestion = () => {
        setQuestions([...questions, { questionText: "", options: ["", ""], correctAnswer: "" }]);
    };

    // Remove a question
    const removeQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    // Add option to a question
    const addOption = (qIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options.push("");
        setQuestions(newQuestions);
    };

    // Handle input change
    const handleQuestionChange = (qIndex, field, value, optionIndex = null) => {
        const newQuestions = [...questions];
        if (field === "questionText") {
            newQuestions[qIndex].questionText = value;
        } else if (field === "option") {
            newQuestions[qIndex].options[optionIndex] = value;
        } else if (field === "correctAnswer") {
            newQuestions[qIndex].correctAnswer = value;
        }
        setQuestions(newQuestions);
    };

    // Submit quiz
    const handleSubmit = async () => {
        try {
            const payload = { title: quizName, questions };
            await axios.post("api/quizzes", payload);
            toast.success("Quiz created successfully!");
            setQuizName("");
            setQuestions([{ questionText: "", options: ["", ""], correctAnswer: "" }]);
        } catch (error) {
            toast.error("Failed to create quiz");
            console.error(error);
        } finally {
            navigate({to:"/quizzes"})
        }
    };

    return (
        <Box sx={{ p: 4, width: "60vw" }}>
            <Typography variant="h4" mb={3}>
                Create Quiz
            </Typography>
            <TextField
                label="Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                fullWidth
                sx={{ mb: 3 }}
            />
            {questions.map((q, qIndex) => (
                <Card sx={{ mb: 3, p: 2 }} key={qIndex}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">Question {qIndex + 1}</Typography>
                            <IconButton color="error" onClick={() => removeQuestion(qIndex)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        <TextField
                            label="Question Text"
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        {q.options.map((option, oIndex) => (
                            <TextField
                                key={oIndex}
                                label={`Option ${oIndex + 1}`}
                                value={option}
                                onChange={(e) => handleQuestionChange(qIndex, "option", e.target.value, oIndex)}
                                fullWidth
                                sx={{ mb: 1 }}
                            />
                        ))}
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            color="success"
                            onClick={() => addOption(qIndex)}
                            sx={{ mb: 2 }}
                        >
                            Add Option
                        </Button>
                        <FormControl fullWidth>
                            <InputLabel>Correct Option</InputLabel>
                            <Select
                                value={q.correctAnswer}
                                onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
                                label="Correct Option"
                            >
                                {q.options.map((opt, i) => (
                                    <MenuItem key={i} value={opt}>
                                        {opt || `Option ${i + 1}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
            ))}
            <Box display="flex" gap={2}>
                <Button variant="outlined" color="success" onClick={addQuestion}>
                    Add Question
                </Button>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="outlined" color="error" component={Link} to="/quizzes">
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default CreateForm;
