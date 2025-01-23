import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import OrderPage from "./OrderPage/OrderPage";
import { CheckoutPage } from "./TossPayments/Checkout";
import { SuccessPage } from "./TossPayments/Success";

import TestDatePage from "./TestDataPage/TestDataPage";
import MainPage from "./TestDataPage/MainPage/MainPage";
import LoginPage from "./TestDataPage/LoginPage/LoginPage";
import SignupPage from "./TestDataPage/LoginPage/SignupPage";
import ThisIsMyPage from "./TestDataPage/MyPage/ThisIsMyPage";

// detail
import DetailMain from "./component/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* order */}
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/checkout" element={<CheckoutPage />} />
        <Route path="/order/success" element={<SuccessPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* 이 아래로 테스트 페이지 */}
        <Route path="/order/testDataPage" element={<TestDatePage />} />
        <Route path="/ThisIsMyPage" element={<ThisIsMyPage />} />
        {/* detail */}
        <Route path="/detail/:seqpfjoinId/view" element={<DetailMain />} />{" "}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
