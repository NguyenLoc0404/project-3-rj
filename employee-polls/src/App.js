import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import NewQuestion from "./components/NewQuestion";
import QuestionDetails from "./components/QuestionDetails";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { setAuthUser } from "./actions/authUser";

// Component để quản lý hiển thị NavBar dựa vào location
function NavBarWithLocation({ authUser }) {
  // Hiển thị NavBar khi đã đăng nhập và không ở trang đăng nhập
  return authUser ? <NavBar /> : null;
}

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const location = useLocation();

  useEffect(() => {
    // Lưu đường dẫn hiện tại vào sessionStorage
    sessionStorage.setItem("lastVisitedPage", location.pathname);
  }, [location]);

  useEffect(() => {
    if (!authUser) {
      dispatch(handleInitialData());

      const storedUserName = sessionStorage.getItem("username");
      if (storedUserName) {
        dispatch(setAuthUser(storedUserName)); // Cập nhật authUser từ sessionStorage vào Redux
      }
    }
  }, [dispatch, authUser]);

  // Kiểm tra đường dẫn đã lưu và điều hướng người dùng khi đăng nhập
  const lastVisitedPage = sessionStorage.getItem("lastVisitedPage");

  return (
    <div>
      <NavBarWithLocation authUser={authUser} />

      <Routes>
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate to={lastVisitedPage || "/"} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute authUser={authUser}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute authUser={authUser}>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute authUser={authUser}>
              <NewQuestion />
            </PrivateRoute>
          }
        />

        <Route
          path="/new-questions"
          element={
            <PrivateRoute authUser={authUser}>
              <Dashboard newQuestion={true} />
            </PrivateRoute>
          }
        />

        <Route
          path="/answer-questions"
          element={
            <PrivateRoute authUser={authUser}>
              <Dashboard newQuestion={false} />
            </PrivateRoute>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <PrivateRoute authUser={authUser}>
              <QuestionDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={authUser ? <NotFound /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
