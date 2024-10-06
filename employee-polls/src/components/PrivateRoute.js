import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../actions/authUser";

const PrivateRoute = ({ authUser, children }) => {
  const location = useLocation();
  const { id } = useParams(); // Lấy id từ URL (nếu có)
  const questions = useSelector((state) => state.questions);
  
  const dispatch = useDispatch();
  console.log('123113');
  
  // Nếu chưa đăng nhập, giữ nguyên URL và chỉ chuyển đến login
  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }

  // Kiểm tra xem câu hỏi có tồn tại không
  if (id && !questions[id]) {
    // Nếu không tìm thấy câu hỏi, log out người dùng và chuyển hướng
    sessionStorage.removeItem("username");
    dispatch(setAuthUser(null));

    return <Navigate to="/login" state={{ from: location }} replace={false} />;
  }

  return children;
};

export default PrivateRoute;
