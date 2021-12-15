import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import OnlineUsers from "./components/OnlineUsers";
import Sidebar from "./components/Sidebar";
import StartScreen from "./components/StartScreen";
import { useAuthcontext } from "./hooks/useAuthContext";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";

function App() {
  const { authIsReady, user } = useAuthcontext();

  return (
    <div className="App">
      {!authIsReady && <StartScreen />}
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Dashboard /> : <Navigate replace to="/login" />
                }
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate replace to="/login" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate replace to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate replace to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate replace to="/" />}
              />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
