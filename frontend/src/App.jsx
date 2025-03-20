import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddAgent from "./pages/AddAgent";
import UploadFile from "./pages/UploadFile";
import AgentDetails from "./pages/AgentDetails";
import { Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Fixed position navbar */}
        <Navbar />
        {/* Add padding-top to account for the fixed navbar height */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: "64px" // Adjust this value to match your navbar height
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add_agent" element={<ProtectedRoute><AddAgent /></ProtectedRoute>} />
            <Route path="/upload_task" element={<ProtectedRoute><UploadFile /></ProtectedRoute>} />
            <Route path="/agent/:id" element={<ProtectedRoute><AgentDetails /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthProvider";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AddAgent from "./pages/AddAgent";
// import UploadFile from "./pages/UploadFile";
// import AgentDetails from "./pages/AgentDetails";
// import { Box } from "@mui/material";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   return (
//     <Router>
//       <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//         <Navbar />
//         <Box component="main" sx={{ flexGrow: 1 }}>
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/add_agent" element={<ProtectedRoute><AddAgent /></ProtectedRoute>} />
//             <Route path="/upload_task" element={<ProtectedRoute><UploadFile /></ProtectedRoute>} />
//             <Route path="/agent/:id" element={<ProtectedRoute><AgentDetails /></ProtectedRoute>} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </Box>
//         <Footer />
//       </Box>
//     </Router>
//   );
// };

// export default App;
