import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { JobOrderType } from "../../data/schema";
import { useEffect, useState } from "react";


interface ReportDropDownInterface{
  data?: JobOrderType,
  setDoctorId: (doctor:string) => void
}

type DoctorType = {
  label:string,
  value: string
}



const ReportDoctorDropDown: React.FC<ReportDropDownInterface> = ({data,setDoctorId}) => {

  const [doctors,setDoctors] = useState<DoctorType[]>([]);

  useEffect(() => {
  if (data?.testItem?.testItemReportTemplates?.length) {
  const uniqueDoctors = data.testItem.testItemReportTemplates
  .map((item: any) => item.doctor)
  .filter(Boolean)

  const uniqueById = Array.from(
  new Map(uniqueDoctors.map((d) => [d.id, d])).values()
  )

  const doctorOptions = uniqueById.map((d) => ({
  label: d.name ?? 'Unknown',
  value: d.id,
  }))

  setDoctors(doctorOptions)
  }
  }, [data])
 
  return(
   <div className="grid grid-cols-[120px_1fr] overflow-hidden items-center gap-x-4 w-full">
      <div className="font-semibold ">Doctor</div>
      <Select onValueChange={(value) => setDoctorId(value)}>
        <SelectTrigger className="w-md">
          <SelectValue placeholder="Select a Doctor" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {doctors.map((doc, index) => (
            <SelectItem key={index} value={doc.value}>
              {doc.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}



export default ReportDoctorDropDown;