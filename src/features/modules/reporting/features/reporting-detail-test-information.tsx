import type { JobOrderType } from "../data/schema"
import { ReportDetailHeader } from "../pages/ReportingDetail"
import ReportDoctorDropDown from "../components/dropdown/report-doctor-dropdown"
import { useState } from "react"
import { ReportTemplateDate } from "../components/report-template-date"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useReportUploadMutation } from "../data/queryOptions"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"



interface IReportingTestInterface{
    data?: JobOrderType
}

const API_BASE_URL = 'https://aipt-api.test/api';


export const ReportingTestInformation: React.FC<IReportingTestInterface> = ({data}) =>{

    const [doctorId,setDoctorId] = useState<string>("");
    const [_reportDate,setReportDate] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const {mutate} = useReportUploadMutation();

    const queryClient = useQueryClient();

    

  


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleUploadReport = () =>{
        if(file && data){
            mutate({
                file:file,
                id: data?.id
            },{
                onSuccess:()=>{
                    toast.success("Report uploaded successfully");
                    queryClient.invalidateQueries({queryKey:["job_orders_key",data.id]});
                }
            })
        }else{
            toast.error("Please select file first");
        }
       
    }



    return(
        <div>
            <ReportDetailHeader label="Test Reporting Information"/>
            <div className="flex flex-col gap-4">
                <ReportDoctorDropDown data={data} setDoctorId={setDoctorId} />
                <ReportTemplateDate setReportDate={setReportDate} />
        
                <div className="my-4">
                    <div className="font-semibold">Templates</div>
                    {
                        doctorId ?
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
                        :
                        <div className="text-gray-600  mt-3">No Doctor Selected</div>
                    }
                </div>
                
                <div className="my-4">
                    {
                        data?.reportFilePath == null ?
                        (
                            <>
                                <Label htmlFor="picture" className="font-semibold">Report File Upload</Label>
                                <div className="grid w-full grid-cols-[1fr_50px] my-2 max-w-sm items-center gap-3">
                                    <Input id="report_file" type="file" accept=".pdf" onChange={handleFileChange} />
                                    <Button onClick={handleUploadReport} className="w-fit">
                                        <Upload />
                                    </Button>
                                </div>
                            </>
                        )
                        :
                        <div className="flex flex-col space-y-2">
                            <Label className="font-semibold">Report File</Label>
                                <a
                                    href={data?.reportFilePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline flex items-center gap-2"
                                >
                                    Download Report
                                </a>
                        </div>
      
                    }
                   
                </div>
            </div>

        </div>
    )
}