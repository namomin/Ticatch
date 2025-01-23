import cssCancel from '../css/Cancel_info.module.css';

export default function CancelInfo() {
    return(
        <div className={cssCancel.wrap}>
            <div className={cssCancel.cancel_info_wrap}>
                <div className={cssCancel.cancel_info_title}>
                    <h3 className={cssCancel.h3}>예매/취소안내</h3>
                </div>
                <div className={cssCancel.cancel_info_content}>
                    <div className={cssCancel.cancel_info_content_title}>
                        <h4 className={cssCancel.h4}>티켓 수령안내</h4>
                    </div>
                    <div className={cssCancel.cancel_info_content_desc}>
                        <ol className={cssCancel.cancel_info_content_ol}>
                            <li className={cssCancel.cancel_info_content_li}>
                                <span className={cssCancel.cancel_info_title}>1) 일반배송</span>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                    예매 완료(결제 완료)확인 후, 인편배송으로 영업일 기준 10일 이내 티켓을 수령하실 수 있습니다.<br/>
                                    티켓을 배송하기 위한 배송료는 고객이 부담합니다.<br/>
                                    행사 또는 관람일에 따라 일반배송 선택이 제한될 수 있습니다.
                                    </span>
                                </div>
                            </li>
                            <li className={cssCancel.cancel_info_content_li}>
                                <span className={cssCancel.cancel_info_title}>2) 현장수령</span>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                    행사 당일 공연 시작 시간 1시간 전 ~ 30분 전까지 행사장 매표소에서 티켓을 수령하실 수 있습니다.<br/>
                                    현장 매표소에서 예매 완료 SMS 또는 예매번호 및 예매자 정보 확인 후 티켓을 수령할 수 있습니다.<br/>
                                    기획사 정책 또는 행사일에 따라 현장 수령 방법의 선택이 제한될 수 있습니다.
                                    </span>
                                </div>
                            </li>
                        </ol>

                        <div className={cssCancel.cancel_info_content_title}>
                            <h4 className={cssCancel.h4}>예매 취소 안내</h4>
                        </div>
                        <ol className={cssCancel.cancel_info_content_ol}>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                    예매 당일 취소하는 경우 이외에는 예매수수료는 환불되지 않습니다.
                                    </span>
                                </div>
                            </li>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                    티켓 예매 후 7일 이내 취소 시 취소수수료는 부과되지 않습니다.<br/>
                                    단, 예매 후 7일 이내라도 취소시점이 관람일로부터 10일 이내라면 그에 해당하는 취소수수료가 부과됩니다.
                                    </span>
                                </div>
                            </li>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                    배송 받은 티켓의 반품 접수는 취소가능시간 이내(영업일 기준)에 우편(빠른 등기) 또는 본사 반품을 통해서 입고 완료 건에 한하여 취소 가능하며, 입고 일을 기준으로 취소수수료 적용됩니다.<br/>
                                    일반우편 또는 택배로 반송 시 발생되는 분실, 지연 도착 등의 문제는 티켓링크에서 책임지지 않으니 이점 유의하시기 바랍니다.
                                    </span>
                                    <table className={cssCancel.cancel_info_content_table} border='1'>
                                        <thead className={cssCancel.thead}>
                                            <tr className={cssCancel.tr}>
                                                <th className={cssCancel.cancel_info_content_th}>관람일 구분</th>
                                                <th className={cssCancel.cancel_info_content_th}>취소가능시간</th>
                                            </tr>
                                        </thead>
                                            <tr className={cssCancel.tr}>
                                                <td className={cssCancel.cancel_info_content_td}>일반</td>
                                                <td className={cssCancel.cancel_info_content_td}>관람일 1일전 17:00시까지</td>
                                            </tr>
                                            <tr className={cssCancel.tr}>
                                                <td className={cssCancel.cancel_info_content_td}>​관람일이 연휴기간이거나 연휴 다음날인 경우​</td>
                                                <td className={cssCancel.cancel_info_content_td}>연휴 시작일 1일전 17:00시까지<br/>
                                                (연휴기간이 '토요일~화요일'인 경우 금요일 17시까지 취소가능)</td>
                                            </tr>
                                    </table>
                                    <span className={cssCancel.span}>
                                        <br/>일부 공연의 경우 취소 가능 시간이 상이할 수 있습니다.​​​ 
                                    </span>
                                </div>
                            </li>
                        </ol>

                        <div className={cssCancel.cancel_info_content_title}>
                            <h4 className={cssCancel.h4}>티켓 환불 안내</h4>
                        </div>
                        <ol className={cssCancel.cancel_info_content_ol}>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                        예매취소 시 취소수수료와 배송료를 제외한 나머지 금액이 환불 됩니다. <br/>
                                        취소수수료는 상품별로 상이할 수 있으며 상품 상세정보 하단에서 확인할 수 있습니다. 
                                    </span>
                                </div>
                            </li>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                        무통장입금으로 결제한 경우 환불처리를 위해 예매자 본인명의의 계좌정보(예금주, 은행, 계좌번호)를 입력해야 하며 접수일로부터 3~5일(영업일기준)이내 환불 받을 수 있습니다. <br/>
                                        상품에 따라 환불 시 송금수수료 500원이 부과될 수 있습니다. ​
                                    </span>
                                </div>
                            </li>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                        신용카드로 결제한 경우 취소일로부터 3~6일(영업일기준)이내 카드사에서 승인취소를 확인할 수 있습니다. 
                                    </span>
                                </div>
                            </li>
                            <li className={cssCancel.cancel_info_content_li}>
                                <div className={cssCancel.div}>
                                    <span className={cssCancel.span}>
                                        계좌이체, 실시간 계좌출금으로 결제한 경우 취소 시 1~2일(영업일 기준)이내 환불 됩니다. <br/> 
                                        휴대폰결제로 결제한 경우 당월 취소 시 즉시 환불되나 익월 취소 시에는 최대 60일까지 소요됩니다. <br/> 
                                        PAYCO포인트, 예매권, 상품권으로 결제한 경우 취소 시 즉시 계정으로 환불 됩니다. <br/> 
                                        <br/>
                                        <br/>
                                    </span>
                                </div>
                            </li>
                        </ol>

                    </div>
                </div>
            </div>
        </div>
    );
}