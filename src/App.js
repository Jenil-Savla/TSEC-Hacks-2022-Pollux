import './App.css';
import LoginPage from './pages/LoginSignup/LoginPage';
import SignupPage from './pages/LoginSignup/SignupPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import Welcome from './pages/WelcomePage/Welcome';
import Profile from './pages/Profile/Profile';
import UserProfile from './pages/UserProfile/UserProfile';
import Requests from './pages/Requests/Requests';

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
          <Route
            exact
            path="/home"
            element={
              <>
              <HomePage />
              </>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <>
              <Profile />
              </>
            }
            />
            <Route
            exact
            path="/profile/:name/:id"
            element={
              <>
              <UserProfile />
              </>
            }
            />
            <Route
            exact
            path="/requests"
            element={
              <>
              <Requests />
              </>
            }
            />
            <Route
            exact
            path="/"
            element={
              <>
              <Welcome />
              </>
            }
            />
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
