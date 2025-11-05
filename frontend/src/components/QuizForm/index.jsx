import { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const TakeQuiz = () => {

    const { quizId } = useParams()
    const [quiz, setQuiz] = useState({});
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    // Fetch quiz data
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axios.get(`https://quiz-app-dm2s.onrender.com/api/quizzes/${quizId}`);
                setQuiz(res.data);
            } catch (error) {
                toast.error("Failed to load quiz");
                console.error(error);
            }
        };
        fetchQuiz();
    }, [quizId]);


    const handleSelect = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    const handleSubmit = () => {
        let tempScore = 0;
        quiz.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) tempScore++;
        });
        setScore(tempScore);
        toast.success(`You scored ${tempScore} / ${quiz.questions.length}`);
    };

    const handleRetake = () => {
        setAnswers({});
        setScore(null);
    };

    console.log("quiz", quiz)
    if (!quiz || Object.keys(quiz).length === 0) return <Typography>Loading quiz...</Typography>;


    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={3}>
                {quiz.title}
            </Typography>

            {score === null ? (
                quiz.questions.map((q, qIndex) => (
                    <Card sx={{ mb: 3, p: 2 }} key={qIndex} style={{ minWidth: "100px" }}>
                        <CardContent>
                            <Typography variant="h6">
                                Q{qIndex + 1}. {q.questionText}
                            </Typography>
                            <RadioGroup
                                value={answers[qIndex] || ""}
                                onChange={(e) => handleSelect(qIndex, e.target.value)}
                            >
                                {q.options.map((opt, oIndex) => (
                                    <FormControlLabel
                                        key={oIndex}
                                        value={opt}
                                        control={<Radio />}
                                        label={opt}
                                    />
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="h5" mb={3}>
                    You scored {score} / {quiz.questions.length}
                </Typography>
            )}

            <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="h5" color="success">
                    You scored {score} / {quiz.questions.length}
                </Typography>
                {score === null ? (
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                ) : (
                    <Button variant="contained" color="success" onClick={handleRetake}>
                        Retake Quiz
                    </Button>
                )}

                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => window.location.reload()}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default TakeQuiz;
