import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cssReviewL from "../css/Review_list.module.css";
import ReviewModify from "./Review_modify";
import ReviewDelete from "./Review_delete";

export default function ReviewList() {
  const { seqpfjoinId } = useParams();
  const [productData, setProductData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null); // 현재 수정 중인 리뷰 ID

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:9090/detail/${seqpfjoinId}/review`
        );
        setProductData(response.data);
        setError(null);
      } catch (err) {
        setError("리뷰 리스트를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seqpfjoinId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleEditClick = (reviewId) => {
    setEditingReviewId(reviewId); // 현재 수정 중인 리뷰 ID 설정
  };

  const handleEditCancel = () => {
    setEditingReviewId(null); // 수정 상태 취소
  };

  const handleEditSave = (updatedReviewContent) => {
    setProductData((prevData) =>
      prevData.map((review) =>
        review.seq_review_id === editingReviewId
          ? { ...review, review_content: updatedReviewContent }
          : review
      )
    );
    setEditingReviewId(null); // 저장 후 수정 상태 종료
  };

  if (loading) return <div>무한로딩</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={cssReviewL.wrap}>
      <div className={cssReviewL.review_list_wrap}>
        <ul className={cssReviewL.review_list}>
          {Array.isArray(productData) ? (
            productData.length > 0 ? (
              productData.map((review) => (
                <li
                  className={cssReviewL.review_list_item}
                  key={review.seq_review_id}
                >
                  <div className={cssReviewL.review_item_star}>
                    <span className={cssReviewL.review_item_start_icon}>
                      ★
                    </span>
                    {review.rating}.0
                  </div>

                  {/* 수정 모드와 일반 모드 구분 */}
                  {editingReviewId === review.seq_review_id ? (
                    <ReviewModify
                      seq_review_id={review.seq_review_id}
                      initialReviewContent={review.review_content}
                      onSave={handleEditSave}
                      onCancel={handleEditCancel}
                    />
                  ) : (
                    <>
                      <span className={cssReviewL.review_item_content}>
                        {review.review_content}
                      </span>
                      <div className={cssReviewL.review_item_writer_info}>
                        <span className={cssReviewL.review_writer_id}>
                          {review.user_id}
                        </span>
                        <span className={cssReviewL.review_item_create_date}>
                          {formatDate(review.review_date)}
                        </span>
                        <span className={cssReviewL.review_item_purchaser}>
                          관람자
                        </span>
                        <div className={cssReviewL.review_btn_wrap}>
                          {review.user_id === userId && (
                            <>
                              <button
                                className={cssReviewL.review_edit_btn}
                                onClick={() =>
                                  handleEditClick(review.seq_review_id)
                                }
                              >
                                수정
                              </button>
                              <ReviewDelete
                                seq_review_id={review.seq_review_id}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))
            ) : (
              <h4 className={cssReviewL.h4}>가장 먼저 리뷰를 남겨보세요!</h4>
            )
          ) : (
            <p className={cssReviewL.p}>아마도 뭔가 잘못 불러오는 중임</p>
          )}
        </ul>
      </div>
    </div>
  );
}
