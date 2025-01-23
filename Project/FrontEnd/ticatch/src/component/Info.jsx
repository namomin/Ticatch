import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reserve from "./reserve";
import SaveBtn from "./SaveBtn";
import cssInfo from '../css/Main.module.css'

export default function Info() {
  const { seqpfjoinId } = useParams(); // 경로에서 공연 시퀀스 아이디값 가져옴
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const response = await axios.get(
          `http://localhost:9090/detail/${seqpfjoinId}/view`
        );
        setProductData(response.data);
        setError(null); // 에러 초기화
      } catch (err) {
        setError("상세정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, [seqpfjoinId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!productData) return <div>데이터가 없습니다.</div>;

  return (
    <>
      {Array.isArray(productData) ? (
        productData.map((product, index) => (
          <>
            <div className={cssInfo.info_wrap} key={index}>
              <div className={cssInfo.poster_container}>
                <div className={cssInfo.poster_box}>
                  <img
                    className={cssInfo.detailview_poster_img}
                    src={product.p_poster}
                    alt={product.p_title}
                  />
                </div>
              </div>
              <div className={cssInfo.simple_info_container}>
                <div className={cssInfo.simple_info_header}>
                  <h1 className={cssInfo.perform_title}>{product.p_title}</h1>
                  <SaveBtn p_poster={product.p_poster}/>
                </div>

                <ul className={cssInfo.simple_info_ul}>
                  <li className={cssInfo.simple_info_li}>
                    <span className={cssInfo.info_title}>장소</span>
                    <div className={cssInfo.simple_info_desc}>
                      {product.pd_hall_name} <br /> {product.fd_addr}
                    </div>
                  </li>
                  <li className={cssInfo.simple_info_li}>
                    <span className={cssInfo.info_title}>관람시간</span>
                    <div className={cssInfo.simple_info_desc}>
                      {(() => {
                        const runtime = product.pd_runtime;

                        // 정규식을 이용해 "X시간 Y분" 형태 분리
                        const hoursMatch = runtime.match(/(\d+)시간/);
                        const minutesMatch = runtime.match(/(\d+)분/);

                        // 시간과 분을 숫자로 추출
                        const hours = hoursMatch
                          ? parseInt(hoursMatch[1], 10)
                          : 0;
                        const minutes = minutesMatch
                          ? parseInt(minutesMatch[1], 10)
                          : 0;

                        // 분 단위로 변환
                        const totalMinutes = hours * 60 + minutes;

                        return `${totalMinutes}분`;
                      })()}
                    </div>
                  </li>
                  <li className={cssInfo.simple_info_li}>
                    <span className={cssInfo.info_title}>기간</span>
                    <div className={cssInfo.simple_info_desc}>
                      {product.p_start_date} ~ {product.p_end_date}
                    </div>
                  </li>
                  <li className={cssInfo.simple_info_li}>
                    <span className={cssInfo.info_title}>가격</span>
                    <div className={cssInfo.simple_info_desc}>
                      <li className={cssInfo.li}>
                        {/* 
                                    1. ",원"으로 등급별 가격 정보 나누기 
                                    2. 공백 기준으로 등급과 가격 나눠서 가격은 <span> 태그에 출력
                                */}
                        {product.pd_seatprice.includes("원,") ? (
                          product.pd_seatprice
                            .split(", ")
                            .map((seat, index) => {
                              const [seatType, seatPrice] = seat
                                .trim()
                                .split(" ");
                              return (
                                <li className={cssInfo.li} key={index}>
                                  {seatType} <span className={cssInfo.span}>{seatPrice}</span>
                                </li>
                              );
                            })
                        ) : (
                          <li className={cssInfo.li}>
                            <span className={cssInfo.span}>{product.pd_seatprice}</span>
                          </li>
                        )}
                      </li>
                    </div>
                  </li>
                  <li className={cssInfo.simple_info_li}>
                    <span className={cssInfo.info_title}>출연진</span>
                    <div className={cssInfo.simple_info_desc}>{product.pd_cast}</div>
                  </li>
                  <li className={cssInfo.simple_info_li}>
                    <span className={cssInfo.info_title}>아동관람</span>
                    <div className={cssInfo.simple_info_desc}>{product.pd_child}</div>
                  </li>
                </ul>
              </div>
            </div>
            <Reserve productData={productData} />
          </>
        ))
      ) : (
        <>
          <p>값이 배열이 아닌 객체임</p>
        </>
      )}
    </>
  );
}
