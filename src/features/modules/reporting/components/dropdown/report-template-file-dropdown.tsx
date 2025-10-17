'use client'
import type { JobOrderType } from '../../data/schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  setReportFile:(file:string) => void,
  data?: JobOrderType
}

export function ReportTemplateFileDropdown({ setReportFile,data }: Props) {

  console.log(data,"data in template file")

  if(!data) return;
  

  return (
      <div className="grid grid-cols-[120px_1fr] overflow-hidden items-center gap-x-4 w-full">
      <div className="font-semibold ">Report Template</div>
      <Select onValueChange={(value)=> setReportFile(value)}>
        <SelectTrigger className="w-md">
          <SelectValue placeholder="Select a Report Template" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {
            data.testItem.testItemReportTemplates?.map((report,index)=>(
              <SelectItem key={index} value={report.reportTemplateName}>
                {report.reportTemplateName}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  )
}