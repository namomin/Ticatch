import cssReviewL from '../css/Review_list.module.css';
import axios from "axios";

export default function ReviewDelete({ seq_review_id }) {

    const handleDelete = async () => {
        try {
            const response = await axios.post(`http://localhost:9090/detail/review/${seq_review_id}/delete`);
            setError(null); // 에러 초기화
        } catch (err) {
            console.error(err);
            setError("리뷰 삭제 실패");
            alert("리뷰 삭제 중 오류가 발생했습니다.");
        } finally {
            alert("리뷰가 삭제되었습니다.");
        }
    };

    return (
        <button
            className={cssReviewL.review_edit_btn}
            onClick={handleDelete}
        >
            삭제
        </button>
    );
}
