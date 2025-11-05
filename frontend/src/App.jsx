import './App.css'
import { Toaster } from "react-hot-toast";
import { Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizForm from './components/QuizForm';
import CreateForm from './components/CreateForm';
import LoginForm from './components/LoginForm';
import TopBar from './components/Topbar';
import { Box } from '@mui/material';

function App() {
  return (
    <>
      <TopBar />
      <Toaster position="top-center" />
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ height: "100vh", width: "100vw" }}>
        <Routes>
          <Route path="*" element={<QuizList />} />
          <Route path="/" element={<QuizList />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quizzes/:quizId" element={<QuizForm />} />
          <Route path="/quizzes/create" element={<CreateForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
