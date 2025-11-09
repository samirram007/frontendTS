import type { JobOrderType } from "../data/schema"
import { ReportDetailHeader } from "../pages/ReportingDetail"
import { useState } from "react"
import { ReportTemplateDate } from "../components/report-template-date"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash, Upload } from "lucide-react"
import { useReportUploadMutation } from "../data/queryOptions"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import type { TestItemReportTemplate } from "../../test_item/data/schema"
import AlertReportDeleteDialog from "../components/AlertReportDeleteDialog"



interface IReportingTestInterface {
    data?: JobOrderType
}

const API_BASE_URL = 'https://aipt-api.test/api';
// const API_BASE_URL = 'https://aipt-api.wishalpha.com/api';


interface IDoctorTemplate {
    name: string,
    templates: TestItemReportTemplate[]
}


export const ReportingTestInformation: React.FC<IReportingTestInterface> = ({ data }) => {

    const today = new Date().toISOString().split("T")[0];
    const [reportDate, setReportDate] = useState<string>(today);
    const [file, setFile] = useState<File | null>(null);
    const { mutate } = useReportUploadMutation();

    const queryClient = useQueryClient();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    const handleUploadReport = () => {
        if (file && data) {
            mutate({
                file: file,
                id: data?.id
            }, {
                onSuccess: () => {
                    toast.success("Report uploaded successfully");
                    queryClient.invalidateQueries({ queryKey: ["job_orders_key", data.id] });
                }
            })
        } else {
            toast.error("Please select file first");
        }

    }

    const doctorIds: number[] = Array.from(new Set(data?.testItem.testItemReportTemplates?.map((item) => item.doctorId)));

    const doctorTemplate: IDoctorTemplate[] = [];

    doctorIds.forEach((item) => {
        const doctors = data?.testItem.testItemReportTemplates?.filter((doc) => doc.doctorId == item);
        if (doctors) {
            const template: IDoctorTemplate = {
                name: doctors[0].doctor.name,
                templates: doctors
            }
            doctorTemplate.push(template);
        }
    });





    return (
        <div>
            <ReportDetailHeader label="Test Reporting Information" />
            <div className="flex flex-col gap-4">
                <div>
                    <div>
                        <div className="grid grid-cols-[240px_1fr] bg-gray-200 px-2">
                            <div className="font-bold text-base">Doctor(s)</div>
                            <div className="px-4 font-bold text-base">Template(s)</div>
                        </div>
                        {
                            doctorTemplate &&
                            doctorTemplate.map((doctor, index) => (
                                <div key={index} className="grid grid-cols-[240px_1fr] px-2 border-b-2  gap-4 py-3">
                                    <div className="font-bold">{doctor.name}</div>
                                    <div>
                                        {
                                            doctor.templates.map((item, index) => {
                                                const fileUrl = `${API_BASE_URL}/report_template_files/${encodeURIComponent(item.reportTemplateName)}`;
                                                return (
                                                    <div key={index} className="pb-2">
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
                            ))
                        }
                    </div>
                    <div>
                        {

                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                    <ReportTemplateDate setReportDate={setReportDate} reportDate={reportDate} />

                    <div className="my-4 w-full">
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

                                <>
                                    <Label className="font-semibold mb-2">View Report File :</Label>
                                    <div className="flex flex-row items-center gap-6 space-y-2">
                                        <Button asChild variant={'outline'} className="border-blue-500">
                                            <a
                                                href={data?.reportFilePath}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline m-0 flex items-center gap-2"
                                            >
                                                View Report
                                            </a>
                                        </Button>

                                        <AlertReportDeleteDialog
                                            children={<Trash size={16} color="red" />}
                                            jobOrderId={data.id}
                                        />
                                    </div>
                                </>


                        }

                    </div>
                </div>


            </div>

        </div>
    )
}