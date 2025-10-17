import type { JobOrderType } from "../data/schema";
import { ReportBookingInformation } from "../features/reporting-detail-booking-information";
import { ReportingTestInformation } from "../features/reporting-detail-test-information";



export function ReportDetailHeader({label}:{label:string}){
    return(
        <div className="w-full py-2 bg-amber-950 mb-8">
            <p className="font-semibold text-center text-white text-xl">{label}</p>
        </div>
    )
}



interface JobOrderProps {
    data?: JobOrderType,
}

const ReportingDetail =(props: JobOrderProps) =>{
    const {data} = props;

    return(
        <>
            <div className="grid grid-cols-2 my-4">
                <ReportBookingInformation jobOrderData={data} />
                <ReportingTestInformation data={data}/>
            </div>
            
        </>
    )
}



export default ReportingDetail;