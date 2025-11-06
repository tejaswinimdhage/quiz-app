import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import axios from "axios";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useAuthStore } from "../../hooks/useAuthStore";
import { Link } from "react-router-dom";

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    const { isAdmin } = useAuthStore();
    const fetchQuizzes = async () => {
        try {
            const res = await axios.get("https://quiz-app-dm2s.onrender.com/api/quizzes");
            setQuizzes(res.data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" mb={3} color="success">
                Welcome to Quiz App!
            </Typography>
            <Typography variant="h4" mb={3} color="success">
                Take Quizzes
            </Typography>
            
            {isAdmin ? <Button mb={3} startIcon={<AddOutlinedIcon />} variant="contained" color="success" component={Link} to="/quizzes/create"> Add Quiz </Button> : null}            

            <Grid container spacing={3} mb={2} >
                {quizzes.map((quiz) => (
                    <Grid item key={quiz._id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            component={Link} to={`/quizzes/${quiz._id}`}
                            sx={{
                                height: 150,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: 3, // shadow
                                borderRadius: 2, // square edges with slight rounding
                                cursor: "pointer",
                                border: "2px solid green",
                                transition: "0.3s",
                                "&:hover": {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <LiveHelpOutlinedIcon sx={{ fontSize: 50, mb: 1 }} color="primary" />
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    textAlign="center"
                                >
                                    {quiz.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default QuizList;
