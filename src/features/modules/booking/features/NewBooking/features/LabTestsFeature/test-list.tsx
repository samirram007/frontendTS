import { AlertAppDialog } from "../../../../shared/components/AlertAppDialog";
import { MdDeleteOutline } from "react-icons/md";
import { useLabTestItem } from "./context/lab-test-context";
import { usePayment } from "@/features/modules/booking/contexts/payment-context";







const LabTestList = () => {

    const {selectTestItemList,setSelectTestItemList} = useLabTestItem();
    const {totalAmount,setTotalAmount,setNetAmount} = usePayment();

    // on change of test date reporting date will change
    const handleTestDateChange = (_id:number,_e:React.HTMLInputTypeAttribute)=>{

    }

    // on report date change
    const handleReportDateChange = (_id:number,_e:React.HTMLInputTypeAttribute)=>{

    }

    // on adding or removing lab tests
    const handleMinusTest = (id:number) =>{
        const remaningList = selectTestItemList.filter((item)=> item.testId != id);
        const amount = selectTestItemList.filter((item) => item.testId == id)[0].amount;
        setSelectTestItemList(remaningList);

        // amount calculation
        setTotalAmount((prev) => prev - Number(amount));
        setNetAmount((prev)=> prev - Number(amount));
    }


    return (
        <div className="my-5 min-h-[30vh] relative border-2 overflow-hidden border-gray-800 rounded">
            <div className="grid grid-cols-[60px_1fr_150px_150px_120px_90px] px-3 border-b-1 font-semibold py-2 border-black">
                <h1>Sl no.</h1>
                <h1>Test Name</h1>
                <h1>Test Date</h1>
                <h1>Reporting Date</h1>
                <h1 className="text-right pr-2">Amount</h1>
                <h1 className="text-center">Action</h1>
            </div>
            <div className={`overflow-auto h-[30vh] ${selectTestItemList.length < 1 ? 'flex justify-center items-center' : ''}`}>
                {
                    selectTestItemList.length > 0 ?
                        selectTestItemList.map((item, index) => (
                            <div key={index} className="text-sm px-3  border-b-[0px] grid grid-cols-[60px_1fr_150px_150px_120px_90px]  items-center">
                                <div className="py-2 px-2">
                                    <h1>{++index}</h1>
                                </div>
                                <div className="py-2">
                                    <h1>{item.name}</h1>
                                </div>
                                <div className="py-2">
                                    <input type="date" onChange={(e) => handleTestDateChange(item.testId, e.target.value)} id="test-date" value={new Date(item.testDate).toISOString().split("T")[0]} />
                                </div>
                                <div className="py-2">
                                    <input type="date" onChange={(e) => handleReportDateChange(item.testId, e.target.value)} id="test-date" value={new Date(item.reportDate).toISOString().split("T")[0]} />
                                </div>
                                <div className="border-x-2 border-black">
                                    <h1 className="text-right py-2 pr-2">{Number(item.amount).toFixed(2)}</h1>
                                </div>
                                <div className="flex justify-center items-center gap-3 py-2">
                                    <AlertAppDialog name={
                                        <MdDeleteOutline className="cursor-pointer text-red-500" size={20} />
                                    }
                                        title="Are you absolutely sure?" description="The action cannot be undone"
                                        cancelText="Cancel" submitText="Submit" onSubmit={() => handleMinusTest(item.testId)}
                                    />
                                </div>
                            </div>
                        ))
                        :
                        <div>
                            <h2>No Tests Selected</h2>
                        </div>
                }
            </div>

            <div className="border-t-2 sticky bottom-0 left-0 w-full py-2 bg-gray-100 z-50 border-black grid grid-cols-[60px_1fr_200px_200px_150px_200px]">
                <div className="text-right col-span-4">
                    <h3>Amount</h3>
                </div>
                <div className="border-l-2 pl-2 pr-2 border-x-2` text-right px-4 ">
                    {totalAmount == 0 ? '00.00' : totalAmount.toFixed(2)}
                </div>
                <div className="col-span-0"></div>
            </div>

        </div>
    )
}


export default LabTestList;