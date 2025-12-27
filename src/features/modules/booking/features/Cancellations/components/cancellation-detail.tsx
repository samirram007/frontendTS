import { Button } from "@/components/ui/button";
import { useTestCancellation } from "../../BookingDetails/data/queryOptions";
import { TestCancellationStatus } from "../../BookingDetails/data/schema";
import { toast } from "sonner";
import { showErrors } from "@/utils/dataClient";
import RefundHeader from "./cancellation-header";
import { useQueryClient } from "@tanstack/react-query";
import { RefundAlertModal } from "../../BookingDetails/Features/RefundFeature/RefundAlertModal";
import type { ITestCancellation } from "../data/schema";
import LongText from "@/components/long-text";
import { dateUtil } from "@/utils/dateUtils";


interface IRefundDetailInterface {
    data?: ITestCancellation
}



const CancellationDetail: React.FC<IRefundDetailInterface> = ({ data }) => {


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

    // const totalAmount = data?.tests? data?.tests.reduce((acc, currentValue) => acc + Number(currentValue.amount), 0);

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
                        data && data?.tests?.map((item, index) => (
                            <div key={index} className="text-sm px-3 border-b-[0px] grid grid-cols-[60px_1fr__200px_200px_200px_150px_200px]  items-center">
                                <div className="py-2 px-2">
                                    <h1>{++index}</h1>
                                </div>
                                <div className="py-2">
                                    <h1>{item.testName}</h1>
                                </div>
                                <div className="py-2">
                                    <LongText>{item.remarks}</LongText>
                                </div>
                                <div className="py-2">
                                    {dateUtil.formatToReportDate(item.testDate)}
                                </div>
                                <div className="py-2">
                                    {dateUtil.formatToReportDate(item.reportDate)}
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
                                                <Button className="bg-blue-500 text-white border-2 border-gray-50 w-full">
                                                    Approved
                                                </Button>
                                                :
                                                (
                                                    <div className="flex gap-3">
                                                        <Button variant={'outline'} onClick={() => onHandleDiscard(item.id, item.remarks)} className="border-red-500 cursor-pointer text-black !border-l-8 border-2">Discard</Button>
                                                        <RefundAlertModal
                                                            action={
                                                                <Button variant={'outline'} className="border-green-500 cursor-pointer border-2 !border-l-8">
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
                    <div className="col-span-0">{0}</div>
                </div>

            </div>
        </>
    )
}

export default CancellationDetail;