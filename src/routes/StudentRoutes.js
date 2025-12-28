import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import AgreementForm from '../Components/AgreementForm';
import StudentDetailForm from '../Components/StudentDetailForm';
import CompanyDashboard from '../Components/CompanyDashboard';
import AnalysisDashboard from '../Components/AnalysisDashboard';
import NotificationPage from '../Components/student/NotificationPage';
import PollanswerPage from './Pages/student/PollAnswerPage';
import StudentQuestions from "../Pages/student/StudentQuestions";
import QuestionBank from "../Pages/student/QuestionBank";



const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="agreement" element={<AgreementForm />} />
      <Route path="studentdetail" element={<StudentDetailForm />} />
      <Route path="company" element={<CompanyDashboard />} />
      <Route path="analysis" element={<AnalysisDashboard />} />
      <Route path="notification" element={<NotificationPage studentId={JSON.parse(localStorage.getItem("user")).id} />}/>    
      <Route path="poll/:pollId" element={<PollanswerPage />} />
      <Route path="questions" element={<StudentQuestions />} />
      <Route path="question-bank" element={<QuestionBank />} />


      
      {/* Default student route */}
      <Route path="" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default StudentRoutes;
