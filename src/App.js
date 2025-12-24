  // import React from 'react';
  // import { Routes, Route, Navigate } from 'react-router-dom';
  // import LoginPage from './Pages/auth/loginpage';
  // import SignupPage from './Pages/auth/Signup';
  // import StudentDashboardLayout from './layouts/StudentDashboardLayout';
  // import AdminDashboardLayout from './layouts/AdminDashboardLayout';
  // import Dashboard from './Pages/student/Dashboard';
  // import AgreementForm from './Components/student/AgreementForm';
  // import StudentDetailForm from './Components/student/StudentDetailForm';
  // import CompanyDashboard from './Pages/student/CompanyDashboard';
  // import AnalysisDashboard from './Pages/student/AnalysisDashboard';
  // import EnterResultDashboard from './Pages/admin/EnterResultDashboard';
  // import A_Dashboard from './Pages/admin/A_Dashboard';
  // import A_CompanyDashboard from './Pages/admin/A_CompanyDashboard';
  // import A_AnalysisDashboard from './Pages/admin/A_AnalysisDashboard';
  // import A_AnalysisFullScreen from './Pages/admin/A_AnalysisFullScreen'; 
  // import U_Dashboard from './Pages/admin/U_Dashboard';
  // import ManageAdmin from "./Pages/admin/ManageAdmin";
  // import PreplacementTalk from './Pages/admin/Preplacement_talk';
  // import Expense from './Pages/admin/Expense';
  // import CVBuilder from "./Pages/student/CVBuilder";
  // import AdminProfile from './Pages/admin/AdminProfile';
  // import StudentProfile from './Pages/student/StudentProfile';


  // function App() {
  //   return (
  //     <Routes>
  //       {/* Public Routes */}
  //       <Route path="/login" element={<LoginPage />} />
  //       <Route path="/signup" element={<SignupPage />} />
        
  //       {/* Protected Routes for Student */}
  //       <Route path="/student/*" element={<StudentDashboardLayout />}>  
  //         <Route index element={<Dashboard />} />
  //         <Route path="dashboard" element={<Dashboard />} />
  //         <Route path="studentprofile" element={<StudentProfile />} />
  //         <Route path="agreement" element={<AgreementForm />} />
  //         <Route path="studentdetail" element={<StudentDetailForm />} />
  //         <Route path="company" element={<CompanyDashboard />} />
  //         <Route path="analysis" element={<AnalysisDashboard />} />
  //         <Route path="cvbuilder" element={<CVBuilder />} />
  //       </Route>
          
  //       {/* Protected Routes for Admin */}
  //       <Route path="/admin/*" element={<AdminDashboardLayout />}>
  //         <Route index element={<A_Dashboard />} />
  //         <Route path="admin_dashboard" element={<A_Dashboard />} />
  //         <Route path="user_dashboard" element={<U_Dashboard />} />
  //         <Route path="companydetails" element={<A_CompanyDashboard />} />
  //         <Route path="result" element={<EnterResultDashboard />} />
  //         <Route path="analysis" element={<A_AnalysisDashboard />} />
  //         <Route path="manage_admin" element={<ManageAdmin />} />
  //         <Route path="preplacement_talk" element={<PreplacementTalk />} />
  //         <Route path="expense" element={<Expense />} />
  //         <Route path="adminprofile" element={<AdminProfile />} /> 
  //       </Route>

  //       {/* NEW Fullscreen Route (outside layout) */}
  //       <Route path="/admin/analysis/fullscreen" element={<A_AnalysisFullScreen />} />

  //       {/* Default Redirect */}
  //       <Route path="*" element={<Navigate to="/login" replace />} />
  //     </Routes>
  //   );
  // }

  // export default App;
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/auth/loginpage';
import SignupPage from './Pages/auth/Signup';
import StudentDashboardLayout from './layouts/StudentDashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import Dashboard from './Pages/student/Dashboard';
import AgreementForm from './Components/student/AgreementForm';
import StudentDetailForm from './Components/student/StudentDetailForm';
import CompanyDashboard from './Pages/student/CompanyDashboard';
import AnalysisDashboard from './Pages/student/AnalysisDashboard';
import CVBuilder from "./Pages/student/CVBuilder";
import StudentProfile from './Pages/student/StudentProfile';
import NotificationPage from "./Components/student/NotificationPage";
import PollanswerPage from "./Pages/student/PollanswerPage";
import ChatPage from './Pages/student/ChatPage';





import A_Dashboard from './Pages/admin/A_Dashboard';
import U_Dashboard from './Pages/admin/U_Dashboard';
import A_CompanyDashboard from './Pages/admin/A_CompanyDashboard';
import EnterResultDashboard from './Pages/admin/EnterResultDashboard';
import A_AnalysisDashboard from './Pages/admin/A_AnalysisDashboard';
import A_AnalysisFullScreen from './Pages/admin/A_AnalysisFullScreen';
import ManageAdmin from "./Pages/admin/ManageAdmin";
import PreplacementTalk from './Pages/admin/Preplacement_talk';
import Expense from './Pages/admin/Expense';
import AdminProfile from './Pages/admin/AdminProfile';
import PollGenerator from './Pages/admin/Pollgenerator';
import PollResults from './Pages/admin/PollResult';
import PollList from './Pages/admin/PollList';
import Questions from './Pages/student/Questions';

import AdminChatPage from './Pages/admin/AdminChatPage';




import PrivateRoute from './routes/PrivateRoute'; // adjust path if needed

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes for Student */}
      <Route
        path="/student/*"
        element={
          <PrivateRoute allowedRoles={['student']}>
            <StudentDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="studentprofile" element={<StudentProfile />} />
        <Route path="agreement" element={<AgreementForm />} />
        <Route path="studentdetail" element={<StudentDetailForm />} />
        <Route path="company" element={<CompanyDashboard />} />
        <Route path="analysis" element={<AnalysisDashboard />} />
        <Route path="cvbuilder" element={<CVBuilder />} />
        <Route path="questions" element={<Questions />} />
        <Route path="notifications" element={ <NotificationPage studentId={JSON.parse(localStorage.getItem("user"))?.id} />}/>     
        
       <Route path="poll/:pollId" element={<PollanswerPage />} />
        <Route path="chat" element={<ChatPage />} />





      </Route>

      {/* Protected Routes for Admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<A_Dashboard />} />
        <Route path="admin_dashboard" element={<A_Dashboard />} />
        <Route path="user_dashboard" element={<U_Dashboard />} />
        <Route path="companydetails" element={<A_CompanyDashboard />} />
        <Route path="result" element={<EnterResultDashboard />} />
        <Route path="analysis" element={<A_AnalysisDashboard />} />
        <Route path="manage_admin" element={<ManageAdmin />} />
        <Route path="preplacement_talk" element={<PreplacementTalk />} />
        <Route path="expense" element={<Expense />} />
        <Route path="adminprofile" element={<AdminProfile />} />
        <Route path="pollgenerator" element={<PollGenerator />} />
        <Route path="polllist" element={<PollList />} />
        <Route path="poll-results/:pollId" element={<PollResults />} />
        <Route path="chat" element={<AdminChatPage />} />



      </Route>

      {/* NEW Fullscreen Route (outside layout) */}
      <Route path="/admin/analysis/fullscreen" element={<A_AnalysisFullScreen />} />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
