import './App.css';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginSignup/LoginPage';
import SignupPage from './pages/LoginSignup/SignupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route
            exact
            path="/signup"
            element={
              <>
                <SignupPage />
              </>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />
          {/* <Route
            exact
            path="/home"
            element={
              <>
                <Navbar/><Home />
              </>
            }
          /> */}
          {/* <Route
            exact
            path="/feedback"
            element={
              <>
                <Navbar/><Feedback />
              </>
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
