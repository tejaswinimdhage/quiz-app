// components/LoginForm.js
import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("credentials", username, import.meta.env.ADMIN_USER, password, import.meta.env.ADMIN_PASS);
        
        if (username === import.meta.env.ADMIN_USER && password === import.meta.env.ADMIN_PASS) {
            login({ isAdmin: true });
        } else {
            login({ isAdmin: false });
        }
        toast.success("Logged in Successfully!");

        navigate("/quizzes")
        setUsername("");
        setPassword("");
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 300 }}>
                <Typography variant="h5" mb={3} textAlign="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="normal"
                        size="small"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        size="small"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
