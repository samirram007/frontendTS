
import { useRouterState } from "@tanstack/react-router";
import RefundHeader from "./refund-header";
import type { RefundRequest } from "../data/schema";




const RefundDetail = () => {

    const refundState = useRouterState({ select: s => s.location.state });

    console.log("Refund State", refundState.selectedData.booking_no);

    return (
        <>
            <RefundHeader data={refundState.selectedData} />
            <div className="my-4 min-h-[30vh] relative border-2 overflow-hidden border-gray-800 rounded">
                <div className="grid grid-cols-[60px_1fr_200px_200px_150px_200px] px-3 border-b-1 font-semibold py-2 border-black">
                    <h1>Sl no.</h1>
                    <h1>Test Name</h1>
                    <h1>Test Date</h1>
                    <h1>Reporting Date</h1>
                    <h1 className="text-right pr-2">Amount</h1>
                    <h1 className="text-center">Action</h1>
                </div>
                <div className={`overflow-auto h-[30vh] ${refundState == null ? 'flex justify-center items-center' : ''}`}>
                    {
                        refundState.selectedData.tests.map((item: RefundRequest, index: any) => (
                            <div className="text-sm px-3 border-b-[0px] grid grid-cols-[60px_1fr_200px_200px_150px_200px]  items-center">
                                <div className="py-2 px-2">
                                    <h1>{++index}</h1>
                                </div>
                                <div className="py-2">
                                    <h1>{item.test_name}</h1>
                                </div>
                                <div className="py-2">
                                    {item.test_date}
                                </div>
                                <div className="py-2">
                                    {item.report_date}
                                </div>
                                <div className="border-x-2 h-full border-black">
                                    <h1 className="text-right py-2 pr-2">{Number(item.amount).toFixed(2)}</h1>
                                </div>
                                <div className=" px-2 flex justify-start items-center gap-1 py-2">

                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="border-t-2 sticky bottom-0 left-0 w-full py-2 bg-gray-100 z-50 border-black grid grid-cols-[60px_1fr_200px_200px_150px_200px]">
                    <div className="text-right col-span-4">
                        <h3>Item Total</h3>
                    </div>
                    <div className="border-l-2 pl-2 pr-2 border-x-2` text-right px-4 ">
                    </div>
                    <div className="col-span-0"></div>
                </div>

            </div>
        </>
    )
}

export default RefundDetail;