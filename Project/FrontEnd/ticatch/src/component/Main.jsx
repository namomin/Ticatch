import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Description from "./desc.jsx";
import CancelInfo from "./Cancel_info.jsx";
import Review from "./Review.jsx";
import Expectation from "./Expectation.jsx";
import Location from "./Location.jsx";
import Info from "./Info.jsx";
import cssMain from "../css/Main.module.css";

export default function DetailMain() {
  const [activeTab, setActiveTab] = useState("상세정보");
  const tabContent = {
    상세정보: <Description />,
    관람후기: <Review />,
    기대평: <Expectation />,
    위치정보: <Location />,
    예매취소안내: <CancelInfo />,
  };

  // header
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    const storedUserId = sessionStorage.getItem("userId");

    if (userToken && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
      setUserId("");
    }
  }, []);

  // 로그아웃 버튼
  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId("");
    alert("로그아웃되었습니다.");
  };

  return (
    <div className={cssMain.wrap}>
      <div className={cssMain.detail_header}>
        <Link to="/MainPage" className={cssMain.detail_header_logo}>
          <span className={cssMain.header_logo}>티</span>
          <span className={cssMain.header_logo_color}>케치</span>
        </Link>

        <div className={cssMain.user_links}>
          {isLoggedIn ? (
            <>
              <span>{userId}님 환영합니다!</span>
              {/* 로그아웃 테스트웃 테스트용 */}
              <button
                onClick={handleLogout}
                style={{
                  color: "red",
                  marginLeft: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                로그아웃
              </button>
              <Link
                to="/ThisIsMyPage"
                style={{ color: "black", paddingLeft: "20px" }}
              >
                마이페이지
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{ color: "black", paddingRight: "20px" }}
              >
                로그인
              </Link>
              <Link to="/signup" style={{ color: "black" }}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>

      <div className={cssMain.Detail_wrap}>
        <Info />

        <section className={cssMain.section}>
          <ul className={cssMain.section_tab_ul}>
            {Object.keys(tabContent).map((tab) => (
              <li
                key={tab}
                className={`${cssMain.li} ${activeTab === tab ? "active" : ""}`} // 활성화된 탭에 스타일 추가
              >
                <button
                  className={cssMain.tab_btn}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className={cssMain.tab_title}>{tab}</span>
                </button>
              </li>
            ))}
            {/* 
                        <li className='section_tab_li'>
                            <button className='tab_btn'>
                                <span className='tab_title'>상세정보</span>
                            </button>
                        </li>
                        <li className='section_tab_li'>
                            <button className='tab_btn'>
                                <span className='tab_title'>관람후기</span>
                            </button>
                        </li>
                        <li className='section_tab_li'>
                            <button className='tab_btn'>
                                <span className='tab_title'>기대평</span>
                            </button>
                        </li>
                        <li className='section_tab_li'>
                            <button className='tab_btn'>
                                <span className='tab_title'>위치정보</span>
                            </button>
                        </li>
                        <li className='section_tab_li'>
                            <button className='tab_btn'>
                                <span className='tab_title'>예매취소안내</span>
                            </button>
                        </li>*/}
          </ul>
        </section>
        <div className={cssMain.section_content}>{tabContent[activeTab]}</div>
      </div>

      <footer className={cssMain.booking_footer}>
        <p>&copy; {new Date().getFullYear()} 티케치. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
