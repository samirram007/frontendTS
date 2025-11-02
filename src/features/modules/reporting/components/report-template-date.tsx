import { Input } from "@/components/ui/input";

interface ReportTemplateDateInterface {
  setReportDate: (date: string) => void;
}

export function ReportTemplateDate({ setReportDate }: ReportTemplateDateInterface) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center gap-x-4 w-full">
      <div className="font-semibold">Report Date</div>
      <Input
        type="date"
        className="w-md"
        onChange={(e) => setReportDate(e.target.value)}
      />
    </div>
  );
}
