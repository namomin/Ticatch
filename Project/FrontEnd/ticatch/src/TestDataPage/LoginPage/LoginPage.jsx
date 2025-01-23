import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const loginData = {
        userId: userId,
        password: password,
      };

      // 먼저 백에 보내야됨
      const response = await axios.post("/api/order/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 로그인 성공시 세션이 유저 아이디 저장 (보안에 취약하다는데 시간이 없으니...)
      sessionStorage.setItem("userToken", response.data.token);
      sessionStorage.setItem("userId", userId);

      console.log("로그인 성공: ", response.data);

      // Navigate to the main page with response data
      navigate("/mainPage", { state: response.data });
    } catch (error) {
      console.error("로그인 실패: ", error);
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className={style.login_page}>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/mainPage");
        }}
      >
        <span style={{ color: "black" }}>티</span>
        <span style={{ color: "red" }}>케치</span>
      </h2>
      <div className={style.login_container}>
        <div className={style.login_form}>
          <label htmlFor="userId" className={style.login_label}>
            아이디
          </label>
          <input
            className={style.login_input}
            type="text"
            id="userId"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <label htmlFor="password" className={style.login_label}>
            비밀번호
          </label>
          <input
            className={style.login_input}
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={style.login_button}
            onClick={() => {
              handleLogin();
            }}
          >
            로그인하기
          </button>
          <button
            className={style.login_button}
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
