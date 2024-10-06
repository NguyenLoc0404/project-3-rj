import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../actions/authUser';
import { useNavigate, useLocation } from 'react-router-dom'; // Sử dụng useLocation
import userImage from '../images/user.png';
import '../css/login.css'; 

const Login = () => {
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState('sarahedo'); 
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin về trang trước khi người dùng bị chuyển hướng
  const { from } = location.state || { from: { pathname: '/' } }; // Trang người dùng muốn đến trước khi đăng nhập, mặc định là "/"

  const handleLogin = () => {
    console.log('handleLogin');
    
    const user = users[username];

    if (user && user.password === password) {
      dispatch(setAuthUser(username));
      sessionStorage.setItem('username', username);
      setError(''); 
      navigate(from); // Điều hướng đến trang người dùng đã cố gắng truy cập trước khi đăng nhập
    } else {
      setError('The authentication was not successful.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center login-page">
      <div className="card text-center content-login-page">
        <div className="card-body">
          <img src={userImage} alt="Example" className="img-fluid" />

          <h3 className="card-title">Login</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} className="btn btn-primary" disabled={!username || !password}>
            Login
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

