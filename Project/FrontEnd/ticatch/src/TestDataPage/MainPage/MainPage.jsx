import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./MainPage.module.css";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const [rank, setRank] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

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

  // 테스트 로그아웃용 버튼
  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId("");
    alert("로그아웃되었습니다.");
  };

  // 자동 슬라이더 이미지들
  const sliderImages = [
    "https://image.toast.com/aaaaab/ticketlink/TKL_8/PC_TopBanner_%ED%8D%BC%EC%8A%A4%ED%8A%B8%EB%A7%A8.jpg",
    "https://image.toast.com/aaaaab/ticketlink/TKL_8/PC_TopBanner_%EB%AE%A4%EC%A7%80%EC%BB%AC_%EC%8B%9C%EB%9D%BC%EB%85%B8_.jpg",
    "https://image.toast.com/aaaaab/ticketlink/TKL_9/PC_TopBanner_%ED%95%B4%EC%A0%81.jpg",
    "https://image.toast.com/aaaaab/ticketlink/TKL_3/PC_TopBanner_%ED%8B%B1%ED%8B%B1%EB%B6%90%EB%A1%9C%EA%B3%A0%EB%A7%8C.jpg",
    "https://image.toast.com/aaaaab/ticketlink/TKL_2/PC_TopBanner_%EC%98%A4%EC%85%80%EB%A1%9C%EC%9D%98%EC%9E%AC%EC%8B%AC.jpg",
  ];

  // 자동 슬라이더 작동
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    axios
      .get("/api/order/rank")
      .then((response) => {
        console.log("rank: ", response.data);
        setRank(response.data || []);
      })
      .catch((error) => console.error("Rank Error: ", error));
  }, []);

  // 백엔드에서 모든 데이터 가져오기
  useEffect(() => {
    axios
      .get("/api/order")
      .then((response) => {
        console.log("API Response:", response.data);
        setConcerts(response.data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // 선택한 장르로 필터링
  const filteredConcerts = concerts.filter((concert) => {
    const matchesGenre =
      genreFilter === "All" || concert.pgenre === genreFilter;
    const matchesSearch =
      concert.ptitle &&
      concert.ptitle.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const ITEMS_PER_SLIDE = 4;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentIndex(0);
  };

  const handleGenreFilter = (value) => {
    setGenreFilter(value);
    setCurrentIndex(0);
  };

  return (
    <>
      {/* 헤더 */}
      <header className={style.booking_header}>
        <div className={style.logo}>
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearch("");
              setGenreFilter("All");
              setCurrentIndex(0);
            }}
          >
            <span style={{ color: "black" }}>티</span>
            <span style={{ color: "red" }}>케치</span>
          </h2>
        </div>
        <input
          type="text"
          placeholder="공연 제목으로 찾아보세요."
          className={style.search_bar}
          value={search}
          onChange={handleSearchChange}
        />
        <div>
          <div className={style.user_links}>
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
      </header>

      {/* 장르 필터 */}
      <nav className={style.navigation_menu}>
        <span
          className={genreFilter === "All" ? style.active : ""}
          onClick={() => handleGenreFilter("All")}
        >
          전체
        </span>
        <span
          className={genreFilter === "뮤지컬" ? style.active : ""}
          onClick={() => handleGenreFilter("뮤지컬")}
        >
          뮤지컬
        </span>
        <span
          className={genreFilter === "대중음악" ? style.active : ""}
          onClick={() => handleGenreFilter("대중음악")}
        >
          대중음악
        </span>
        <span
          className={genreFilter === "복합" ? style.active : ""}
          onClick={() => handleGenreFilter("복합")}
        >
          복합
        </span>
        <span
          className={genreFilter === "전시/행사" ? style.active : ""}
          onClick={() => handleGenreFilter("전시/행사")}
        >
          전시/행사
        </span>
        <span
          className={genreFilter === "서양음악(클래식)" ? style.active : ""}
          onClick={() => handleGenreFilter("서양음악(클래식)")}
        >
          서양음악(클래식)
        </span>
      </nav>

      <div className={style.main_content}>
        {/* 메인 콘텐츠 */}
        <main className={style.main_content}>
          {!search && genreFilter === "All" && (
            <>
              <div className={style.auto_slider}>
                <img
                  src={sliderImages[sliderIndex]}
                  alt={`Slide ${sliderIndex + 1}`}
                  className={style.slider_image}
                />
              </div>

              <div className={style.nav_title_containar}>
                <h2 className={style.nav_title_text}>랭킹</h2>
              </div>

              <div>
                <div className={style.concert_slider}>
                  {rank.slice(0, ITEMS_PER_SLIDE).map((item, index) => (
                    <div className={style.concert_card} key={item.seqPfjoinId}>
                      <div className={style.image_container}>
                        <Link to={`/detail/${item.seqPfjoinId}/view`}>
                          <img
                            src={item.pposter}
                            className={style.concert_image}
                          />
                        </Link>
                        <span className={style.rank}>{index + 1}</span>
                      </div>
                      <h2 className={style.item_title}>
                        <span className={style.item_genre}>{item.pgenre}</span>{" "}
                        <br />
                        {item.ptitle} <br />
                        {/* 공연 기간 출력 안됨 */}
                        {/* <span className={style.item_date}>{item.pstartdate} ~ {item.pEndDate}</span> */}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* 공연 목록 */}
          <div className={style.nav_title_containar}>
            <h2 className={style.nav_title_text}>목록</h2>
          </div>
          <div className={style.concert_container}>
            <div className={style.concert_slider}>
              {filteredConcerts.length > 0 ? (
                filteredConcerts
                  // .slice(currentIndex, currentIndex + ITEMS_PER_SLIDE)
                  .map((concert) => (
                    <div
                      key={concert.seqPfjoinId}
                      className={style.image_container}
                    >
                      <Link to={`/detail/${concert.seqPfjoinId}/view`}>
                        <img
                          src={concert.pposter}
                          className={style.concert_image}
                        />
                      </Link>
                      <div className={style.prd_list_content}>
                        <h3>{concert.ptitle}</h3>
                        <p>
                          <span className={style.prd_title}>장르</span>
                          <span className={style.prd_title_item}>
                            {concert.pgenre}
                          </span>
                        </p>
                        <p>
                          <span className={style.prd_title}>가격</span>
                          <span className={style.prd_title_item}>
                            {concert.pdSeatprice}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* 푸터 */}
      <footer className={style.booking_footer}>
        <p>&copy; {new Date().getFullYear()} 티케치. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default MainPage;
