import { Input } from "@/components/ui/input";

interface ReportTemplateDateInterface {
  setReportDate: (date: string) => void;
  reportDate: string
}

export function ReportTemplateDate({ setReportDate, reportDate }: ReportTemplateDateInterface) {
  return (
    <div className="mb-2 space-y-1 w-full">
      <div className="font-semibold">Report Date :</div>
      <Input
        type="date"
        className="w-6/12"
        value={reportDate}
        onChange={(e) => setReportDate(e.target.value)}
      />
    </div>
  );
}
