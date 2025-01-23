import axios from 'axios';
import cssExp from '../css/Review_list.module.css';

export default function ExpDelete({ seq_exp_id }) {

    const handleDelete = async () => {
        try {
            const response = await axios.post(`http://localhost:9090/detail/exp/${seq_exp_id}/delete`);
            setError(null); // 에러 초기화
        } catch (err) {
            console.error(err);
            setError("기대평 삭제 실패");
            alert("기대평 삭제 중 오류가 발생했습니다.");
        } finally {
            alert("기대평이 삭제 되었습니다.");
        }
    };

    return(
        <button 
            className={cssExp.review_edit_btn}
            onClick={handleDelete}
        >
            삭제
        </button>
    );
}