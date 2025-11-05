import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import QuizIcon from '@mui/icons-material/Quiz';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';

export default function TopBar() {

    const { isLoggedIn } = useAuthStore();

    return (
        <AppBar position="fixed" color="success">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    component={Link}
                    to="/quizzes"
                >
                    <QuizIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}
                    component={Link}
                    to="/quizzes">
                    Quiz App
                </Typography>
                <Button color="inherit" component={Link} to="/login">
                    {isLoggedIn ? "Logout" : "Login"}
                </Button>
            </Toolbar>
        </AppBar>
    );
}