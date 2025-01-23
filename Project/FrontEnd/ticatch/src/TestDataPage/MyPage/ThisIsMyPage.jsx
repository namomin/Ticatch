import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./ThisIsMyPage.module.css";

export default function ThisIsMyPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [saveList, setSaveList] = useState([]);

  // state 추가: 입력 필드 관리
  const [seqUserId, setseqUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // sesstion 에서 가지고 오기
  const thisIsUserId = sessionStorage.getItem("userId");
  // console.log(thisIsUserId);
  const requestData = {
    userId: sessionStorage.getItem("userId"),
  };

  // userId 로 user 데이터 가지고 오기
  useEffect(() => {
    axios
      .post("/api/order/userInfo", requestData)
      .then((response) => {
        console.log("User Info:", response.data);
        setUserInfo(response.data || []);
        setseqUserId(response.data.seqId);
      })
      .catch((error) => {
        console.error("User info 불러오기 에러:", error);
      });
  }, [password]);

  // 주문 내역 가지고 오기
  useEffect(() => {
    axios
      .get("/api/order/orders", {
        params: { userId: sessionStorage.getItem("userId") },
      })
      .then((response) => {
        const data = response.data;

        if (typeof data === "string") {
          setOrderList([]); // 빈 배열로 설정
        } else if (Array.isArray(data)) {
          setOrderList(data); // 배열을 상태로 설정
        } else {
          setOrderList([]); // 예상 외의 형식일 경우 빈 배열로 설정
        }
      })
      .catch((error) => {
        console.error("주문내역 불러오기 에러:", error);
        setOrderList([]); // 에러 발생 시 빈 배열로 설정
      });
  }, []);

  // 회원 수정 버튼
  const handleUpdate = () => {
    // email @ 랑 .com 있는지 확인하는 정규표현식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호를 확인해주세요");
      return;
    }

    // 서버에 데이터를 전송하는 로직
    const updatedUserInfo = {
      seqUserId,
      password,
      name,
      email,
      phone,
    };

    console.log("수정된 정보:", updatedUserInfo);
    axios
      .post("/api/order/updateUserInfo", updatedUserInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log("data that's here:", data);

        if (data === "아이디 중복") {
          alert("중복된 아이디 입니다.");
        } else {
          alert("정보가 수정되었습니다");
        }
      })
      .catch((error) => {
        console.error(
          "Error updating user info:",
          error.response ? error.response.data : error.message
        );
      });

    // 버튼 눌르면 input box 비움
    setPassword("");
    setConfirmPassword("");
    setName("");
    setEmail("");
    setPhone("");
  };

  // 아렇게만 보내짐???
  const saveData = {
    userid: thisIsUserId,
  };

  // 나의 찜 내역 가지고 오기
  useEffect(() => {
    axios
      .post("/api/order/getSaves", saveData)
      .then((response) => {
        console.log("Save Info:", response.data);
        if (response.data === "찜 내역이 없습니다") {
          setSaveList([]); // 빈 배열로 설정
        } else if (Array.isArray(response.data)) {
          setSaveList(response.data); // 응답이 배열인 경우 그대로 설정
        } else {
          setSaveList([response.data]); // 단일 객체를 배열로 변환
        }
      })
      .catch((error) => {
        console.error("Error fetching save info:", error);
      });
  }, []);

  return (
    <>
    <header className={style.mypage_header}>
        <div className={style.mypage_logo}>
          <h2>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/mainPage");
              }}
            >
              <span style={{ color: "black" }}>티</span>
              <span style={{ color: "red" }}>케치</span>
            </span>
          </h2>
        </div>
        <div className={style.logout_btn}>
        <button
          onClick={() => {
            sessionStorage.removeItem("userToken");
            sessionStorage.removeItem("userId");
            setUserId("");
            alert("로그아웃되었습니다.");
            navigate("/mainPage")
          }}
          style={{
            color: "red",
            marginLeft: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          로그아웃
        </button>
        </div>
      </header>
    
    <div className={style.mypage_container}>
      <main className={style.mypage_main}>
        
        <div className={style.mypage_user_info}>
          <div className={style.mypage_user_info_id}>
            <span className={style.mypage_userId_color}>
              {sessionStorage.getItem("userId")}님 &nbsp;
            </span>
            마이페이지
          </div>
          <div className={style.user_infos}>
            {userInfo ? (
            <>
              <p className={style.nav_user_info_title}>이름: {userInfo.name}</p>
              <p className={style.nav_user_info_title}>이메일: {userInfo.email}</p>
              <p className={style.nav_user_info_title}>전화번호: {userInfo.phone}</p>
              <p className={style.nav_user_info_title}>가입일: {userInfo.createDate}</p>
              <p className={style.nav_user_info_title}>마지막 정보 수정일: {userInfo.updateDate}</p>
            </>
            ) : (
            <p>로딩중...</p>
            )}
          </div>
        </div>

        <div className={style.mypage_sections_wrap}>
        <section className={style.mypage_section_container}>
            <div className={style.mypage_title}>
              <h3>회원 정보 수정</h3>
            </div>
            <div className={style.user_info_modif_wrap}>
              <div className={style.user_info_modif_title}>
                <ul className={style.user_info_modify_title_ul}>
                  <li>비밀번호</li>
                  <li>비밀번호 확인</li>
                  <li>이름</li>
                  <li>이메일</li>
                  <li>전화번호</li>
                </ul>
              </div>
              <ul className={style.user_info_modif}>
                <input
                  className={style.input}
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className={style.input}
                  type="password"
                  placeholder="비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                  className={style.input}
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={style.input}
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={style.input}
                  type="text"
                  placeholder="전화번호"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </ul>
            </div>
            <div className={style.user_modif_btn_wrap}>
              <button className={style.button} onClick={handleUpdate}>
                수정하기
              </button>
            </div>
          </section>

          <section className={style.mypage_section_container}>
            <div className={style.mypage_title}>
              <h3>예매 내역</h3>
            </div>
            <table className={style.reserve_table}>
              <tr className={style.reserve_table_theader}>
                <td>예매번호</td>
                <td>공연아이디</td>
                <td>공연일</td>
                <td>공연회차</td>
                <td>좌석번호</td>
                <td>장소</td>
                <td>예매인원</td>
                <td>결제일</td>
              </tr>
              {Array.isArray(orderList) && orderList.length > 0 ? (
              orderList.map((order, index) => (
                <tr key={order.orderId || `${order.seqOrderId}-${index}`}
                    className={style.reserve_table_content}
                >
                  <td>{order.seqOrderId}</td>
                  <td
                      key={order}
                      onClick={() => {
                      navigate(`/detail/${order.seqPfjoinId}/view`);
                    }}
                  >
                    <p className={style.reserve_seqpfjoinId}>{order.seqPfjoinId}</p>
                  </td>
                  <td>{order.viewDate}</td>
                  <td>{order.viewTime}</td>
                  <td>{order.seatNum}</td>
                  <td>{order.place}</td>
                  <td>{order.totalTicket}</td>
                  <td>{order.buyDate}</td>
                </tr>
              ))
              ) : (
                <td>예매 내역이 없습니다.</td>
              )}
            </table>
          </section>

          <section className={style.mypage_section_container}>
            <div className={style.mypage_title}>
              <h3>찜 내역</h3>
            </div>

            <div className={style.mypage_save_container}>
              {Array.isArray(saveList) && saveList.length > 0 ? (
                saveList.map((save, index) => (
              <div  key={save}
                    onClick={() => {
                    navigate(`/detail/${save.seqpfjoinid}/view`);
                  }}
                    className={style.mypage_save_img}
                    >
                    <img src={save.pposter} alt={save.seqpfjoinid}/>
              </div>
              ))
              ) : (
                <li>보고싶은 공연을 찜해보세요!</li>
              )}
            </div>
          </section>
        </div>

        {/* <div className={style.mypage_develop_memo}>
          <h2>
            회원 탈퇴는 없다 (모든 테이블에서 찾아서 삭제해야되는데 시간 부족)
          </h2>
          <h2>환불은 내일 시간 있으면 해보고 안되면 없음</h2>
          <h2>찜 삭제는 다시 상세 페이지 가서 하고 와야됨</h2>
        </div> */}

      </main>

      <footer className={style.mypage_footer}>
        <p>&copy; {new Date().getFullYear()} 티케치. All Rights Reserved.</p>
      </footer>
    </div>
    </>
  );
}
