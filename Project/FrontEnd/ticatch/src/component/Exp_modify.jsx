import { useState } from "react";
import axios from "axios";
import cssExp from '../css/Review_list.module.css';

export default function ExpModify({ seq_exp_id, initialExpContent, onSave, onCancel }) {
    const [expContent, setExpContent] = useState(initialExpContent); // 기대평 내용 상태 관리

    const handleContentChange = (e) => {
        setExpContent(e.target.value); // textarea의 내용 변경
    };

    const handleSave = async () => {
        const updatedExp = {
          seq_exp_id: seq_exp_id,
          exp_content: expContent,
        };
    
        try {
          const response = await axios.post(
            `http://localhost:9090/detail/exp/${seq_exp_id}/modify`,
            updatedExp
          );
    
          if (response.status === 200) {
            onSave(expContent); // 부모 컴포넌트로 수정된 내용 전달
            alert("기대평이 수정되었습니다!");
          }
        } catch (error) {
          console.error(error);
          alert("기대평 수정에 실패했습니다.");
        }
      };

    return(
        <div>
            <textarea
            className={cssExp.review_item_content_edit}
            value={expContent}
            onChange={handleContentChange}
            />
            <div className={cssExp.review_modifymode_wrap}>
            <button className={cssExp.review_edit_submit_btn} onClick={handleSave}>
                수정
            </button>
            <button className={cssExp.review_edit_btn} onClick={onCancel}>
                취소
            </button>
            </div>
        </div>
    );
}