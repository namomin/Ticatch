import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./SignupPage.module.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("/api/order/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 서버에서 반환된 응답을 확인
      if (response.data === "아이디 중복") {
        alert("아이디가 이미 존재합니다.");
      } else if (response.data === "회원가입 성공") {
        alert("회원가입 성공!");
        navigate("/login"); // 로그인 페이지로 이동
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className={style.signup_page}>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/mainPage");
        }}
      >
        <span style={{ color: "black" }}>티</span>
        <span style={{ color: "red" }}>케치</span>
      </h2>
      <form className={style.signup_form} onSubmit={handleSubmit}>
        <label htmlFor="userId" className={style.signup_label}>
          아이디
        </label>
        <input
          className={style.signup_input}
          type="text"
          id="userId"
          name="userId"
          placeholder="아이디"
          value={formData.userid}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">비밀번호</label>
        <input
          className={style.signup_input}
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          className={style.signup_input}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">이름</label>
        <input
          className={style.signup_input}
          type="text"
          id="name"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">핸드폰</label>
        <input
          className={style.signup_input}
          type="text"
          id="phone"
          name="phone"
          placeholder="핸드폰"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">이메일</label>
        <input
          className={style.signup_input}
          type="email"
          id="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button className={style.signup_button} type="submit">
          가입완료
        </button>
        <button
          className={style.signup_button}
          type="button"
          onClick={() => navigate("/login")}
        >
          로그인하기
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
