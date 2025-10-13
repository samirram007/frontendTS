import { getData } from "@/utils/dataClient";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// generic enum schema (array of strings)
const ReportTemplateFileResponseSchema = z.object({
    data: z.array(z.string()),
});

const fetchReportTemplateFile = async () => {
    const res = await getData(`/report_template_files`);
    // console.log(EnumResponseSchema.parse(res).data, 'enum data');
    return ReportTemplateFileResponseSchema.parse(res).data;
};

export const useReportTemplateFile = () => {
    return useQuery<string[]>({
        queryKey: ["report-template-files"],
        queryFn: () => fetchReportTemplateFile(),
    });
};


