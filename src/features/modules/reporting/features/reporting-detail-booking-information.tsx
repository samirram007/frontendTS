import type { JobOrderType } from "../data/schema";
import { ReportDetailHeader } from "../pages/ReportingDetail";


const formatDateForInput = (dateString: string | Date | undefined | null) => {
    if(dateString == undefined || null) return;
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};






export function ReportBookingInformation({jobOrderData}:{jobOrderData?:JobOrderType}){
    return(
        <div className="relative">
            <ReportDetailHeader label="Booking Information" />
            {/* Booking Information */}
            <div >
                <div className="grid grid-cols-2 gap-8">
                    {/* first grid booking information */}
                    <div className="flex flex-col gap-1.5 text-[15px] font-medium">
                        <div className="grid grid-cols-[110px_20px_1fr] justify-evenly items-center">
                            <div>Booking Id</div>
                            <div>:</div>
                            <div>1234567890</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Patient</div>
                            <div>:</div>
                            <div>1234567890</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Address</div>
                            <div>:</div>
                            <div>1234567890</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Ref. Doctor</div>
                            <div>:</div>
                            <div>1234567890</div>
                        </div>
                    </div>
                    {/* second grid booking information */}
                    <div className="flex flex-col gap-1.5 text-[15px] font-medium">
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Booking Date</div>
                            <div>:</div>
                            <div>{formatDateForInput(jobOrderData?.expectedStartDate)}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Age</div>
                            <div>:</div>
                            <div>1234567890</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Sex</div>
                            <div>:</div>
                            <div>1234567890</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Reporting Time</div>
                            <div>:</div>
                            <div>{formatDateForInput(jobOrderData?.expectedEndDate)}</div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    )
}


