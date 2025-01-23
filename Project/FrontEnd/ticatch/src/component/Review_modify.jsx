import { useState } from "react";
import axios from "axios";
import cssReviewL from "../css/Review_list.module.css";

export default function ReviewModify({ seq_review_id, initialReviewContent, onSave, onCancel }) {
  const [reviewContent, setReviewContent] = useState(initialReviewContent); // 리뷰 내용 상태 관리

  const handleContentChange = (e) => {
    setReviewContent(e.target.value); // textarea의 내용 변경
  };

  const handleSave = async () => {
    const updatedReview = {
      seq_review_id: seq_review_id,
      review_content: reviewContent,
    };

    try {
      // 상태가 변경된 reviewContent로 서버에 바로 요청을 보냄
      const response = await axios.post(
        `http://localhost:9090/detail/review/${seq_review_id}/modify`,
        updatedReview
      );

      if (response.status === 200) {
        onSave(reviewContent); // 부모 컴포넌트로 수정된 내용 전달
        alert("리뷰가 수정되었습니다!");
      }
    } catch (error) {
      console.error(error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  return (
    <div>
      <textarea
        className={cssReviewL.review_item_content_edit}
        value={reviewContent}
        onChange={handleContentChange}
      />
      <div className={cssReviewL.review_modifymode_wrap}>
        <button className={cssReviewL.review_edit_submit_btn} onClick={handleSave}>
          수정
        </button>
        <button className={cssReviewL.review_edit_btn} onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
}
