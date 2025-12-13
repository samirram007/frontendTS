import type { RefundDetailRequest, RefundRequest } from "../data/schema";
import { Button } from "@/components/ui/button";
import { useTestCancellation } from "../../BookingDetails/data/queryOptions";
import { TestCancellationStatus } from "../../BookingDetails/data/schema";
import { toast } from "sonner";
import { showErrors } from "@/utils/dataClient";
import RefundHeader from "./refund-header";
import { useQueryClient } from "@tanstack/react-query";
import { RefundAlertModal } from "../../BookingDetails/Features/RefundFeature/RefundAlertModal";


interface IRefundDetailInterface {
    data?: RefundDetailRequest
}



const RefundDetail: React.FC<IRefundDetailInterface> = ({ data }) => {


    const { mutate } = useTestCancellation();
    const queryClient = useQueryClient();

    const onHandleDiscard = (id: number, remark: string | null | undefined) => {
        mutate({
            id: id,
            status: TestCancellationStatus.CancellationDiscard,
            remarks: remark ?? null
        }, {
            onSuccess: () => {
                toast.success("Test Cancellation discarded successfully");
                queryClient.invalidateQueries({ queryKey: ['cancelled-booking', data?.bookingNo] })
            },
            onError: (error) => {
                showErrors(error);
            }
        })
    }

    const totalAmount = data?.tests.reduce((acc, currentValue) => acc + Number(currentValue.amount), 0);

    console.log(data, "Data of redunf");
    return (
        <>
            <RefundHeader data={data} />
            <div className="my-4 min-h-[30vh] relative border-2 overflow-hidden border-gray-800 rounded">
                <div className="grid grid-cols-[60px_1fr_200px_200px_200px_150px_200px] px-3 border-b-1 font-semibold py-2 border-black">
                    <h1>Sl no.</h1>
                    <h1>Test Name</h1>
                    <h1>Remark</h1>
                    <h1>Test Date</h1>
                    <h1>Reporting Date</h1>
                    <h1 className="text-right pr-2">Amount</h1>
                    <h1 className="text-center">Action</h1>
                </div>
                <div className={`overflow-auto h-[30vh] ${data == null ? 'flex justify-center items-center' : ''}`}>
                    {
                        data && data?.tests?.map((item: RefundRequest, index: any) => (
                            <div key={index} className="text-sm px-3 border-b-[0px] grid grid-cols-[60px_1fr__200px_200px_200px_150px_200px]  items-center">
                                <div className="py-2 px-2">
                                    <h1>{++index}</h1>
                                </div>
                                <div className="py-2">
                                    <h1>{item.testName}</h1>
                                </div>
                                <div className="py-2">
                                    <h1>{item.remarks}</h1>
                                </div>
                                <div className="py-2">
                                    {item.testDate}
                                </div>
                                <div className="py-2">
                                    {item.reportDate}
                                </div>
                                <div className="border-x-2 h-full border-black">
                                    <h1 className="text-right py-2 pr-2">{Number(item.amount).toFixed(2)}</h1>
                                </div>
                                <div className=" px-2 flex justify-start items-center gap-1 py-2">
                                    {
                                        item.status == "discard" ?
                                            <Button className="!bg-white text-black border-2 border-black w-full">
                                                {item.status.toUpperCase()}
                                            </Button>
                                            :
                                            item.status == "approved" ?
                                                <Button className="!bg-white text-black border-2 border-green-500 w-full">
                                                    {item.status.toUpperCase()}
                                                </Button>
                                                :
                                                (
                                                    <div className="flex">
                                                        <Button onClick={() => onHandleDiscard(item.id, item.remarks)} className="bg-red-500 hover:bg-red-700 border-2">Discard</Button>
                                                        <RefundAlertModal
                                                            action={
                                                                <Button className="!bg-green-500 text-white border-2 border-gray-50">
                                                                    Approve
                                                                </Button>
                                                            }
                                                            bookingNo={data.bookingNo}
                                                            itemId={item.stockJournalEntryId}
                                                            cancelRemark={item.remarks ?? ""}
                                                        />
                                                    </div>
                                                )
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="border-t-2 sticky bottom-0 left-0 w-full py-2 bg-gray-100 z-50 border-black grid grid-cols-[60px_1fr__200px_200px_200px_150px_200px]">
                    <div className="text-right col-span-5">
                        <h3>Item Total</h3>
                    </div>
                    <div className="border-l-2 pl-2 pr-2 border-x-2` text-right px-4 ">
                    </div>
                    <div className="col-span-0">{totalAmount}</div>
                </div>

            </div>
        </>
    )
}

export default RefundDetail;