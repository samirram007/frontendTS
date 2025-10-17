import type { JobOrderType } from "../data/schema"
import { ReportDetailHeader } from "../pages/ReportingDetail"
import ReportDoctorDropDown from "../components/dropdown/report-doctor-dropdown"
import { useState } from "react"
import { ReportTemplateDate } from "../components/report-template-date"



interface IReportingTestInterface{
    data?: JobOrderType
}

const API_BASE_URL = 'https://aipt-api.test/api';


export const ReportingTestInformation: React.FC<IReportingTestInterface> = ({data}) =>{

    const [doctorId,setDoctorId] = useState<string>("");
    const [reportDate,setReportDate] = useState<string>("");


    console.log("DoctorId",doctorId,reportDate);


    return(
        <div>
            <ReportDetailHeader label="Test Reporting Information"/>
            <div className="flex flex-col gap-4">
                <ReportDoctorDropDown data={data} setDoctorId={setDoctorId} />
                <ReportTemplateDate setReportDate={setReportDate} />
                <div className="my-4">
                    {
                        doctorId &&
                        data?.testItem.testItemReportTemplates?.filter((item) => Number(item.doctorId) == Number(doctorId)).map((item,index)=>{
                            const fileUrl = `${API_BASE_URL}/report_template_files/${encodeURIComponent(item.reportTemplateName)}`;
                            return(
                                <div key={index} className="py-2">
                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {item.reportTemplateName}
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}