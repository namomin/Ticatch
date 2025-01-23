import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExpModify from './Exp_modify';
import ExpDelete from './Exp_delete';
import cssExpL from '../css/Review_list.module.css';

export default function ExpectationList() {
    const { seqpfjoinId } = useParams(); // 경로에서 공연 시퀀스 아이디값 가져옴
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리
    const [editingExpId, setEditingExpId] = useState(null); // 현재 수정 중인 리뷰 ID

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); 
                const response = await axios.get(`http://localhost:9090/detail/${seqpfjoinId}/exp`);
                setProductData(response.data);
                setError(null);
            } catch (err) {
                setError("기대평 리스트를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [seqpfjoinId]);

    // 2024-12-09 05:36 이런형식으로 출력
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월이 0이므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const handleEditClick = (expId) => {
    setEditingExpId(expId); // 현재 수정 중인 리뷰 ID 설정
    };

    const handleEditCancel = () => {
    setEditingExpId(null); // 수정 상태 취소
    };

    const handleEditSave = (updatedExpContent) => {
    setProductData((prevData) =>
        prevData.map((exp) =>
            exp.seq_exp_id === editingExpId
            ? { ...exp, exp_content: updatedExpContent }
            : exp
        )
    );
    setEditingExpId(null); // 저장 후 수정 상태 종료
    };

    if (loading) return <div>무한로딩</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={cssExpL.wrap}>
            <div className={cssExpL.review_list_wrap}>
                <ul className={cssExpL.review_list}>
                    {Array.isArray(productData) ? (
                        productData.length > 0 ? (
                            productData.map((exp, index) => (
                                <li className={cssExpL.review_list_item} key={index}>
                                    {/* 수정 모드와 일반 모드 구분 */}
                                    {editingExpId === exp.seq_exp_id ? (
                                        <ExpModify
                                            seq_exp_id={exp.seq_exp_id}
                                            initialExpContent={exp.exp_content}
                                            onSave={handleEditSave}
                                            onCancel={handleEditCancel}
                                        />
                                    ) : (
                                        <>
                                            <span className={cssExpL.review_item_content}>
                                                {exp.exp_content}
                                            </span>
                                            <div className={cssExpL.review_item_writer_info}>
                                                <span className={cssExpL.review_writer_id}>
                                                    {exp.user_id}
                                                </span>
                                                <span className={cssExpL.review_item_create_date}>
                                                    {formatDate(exp.exp_date)}
                                                </span>
                                                <div className={cssExpL.review_btn_wrap}>
                                                    {exp.user_id === userId && (
                                                        <>
                                                            <button
                                                                className={cssExpL.review_edit_btn}
                                                                onClick={() => handleEditClick(exp.seq_exp_id)}
                                                            >
                                                                수정
                                                            </button>
                                                            <ExpDelete seq_exp_id={exp.seq_exp_id} />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))
                        ) : (
                            <h4 className={cssExpL.h4}>가장 먼저 기대평을 남겨보세요!</h4>
                        )
                    ) : (
                        <p className={cssExpL.p}>아마도 뭔가 잘못 불러오는 중임</p>
                    )}
                </ul>
            </div>
        </div>
    );
    
}
