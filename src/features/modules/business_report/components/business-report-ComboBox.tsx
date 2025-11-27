import { useEffect, useState } from "react";
import { useGetBusinessReportListQuery } from "../data/queryOptions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

type BusinessLabValue = {
    label: string,
    value: string
}

interface BusinessReportInterface {
    setValue: (val: string) => void,
    value: string
}


const BusinessReportDropdownComboBox: React.FC<BusinessReportInterface> = ({ setValue, value }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [businessReports, setBusinessReport] = useState<BusinessLabValue[]>([]);

    const { data, isSuccess } = useGetBusinessReportListQuery();



    useEffect(() => {
        if (isSuccess && data) {
            const reports: BusinessLabValue[] = [];

            data.data.data.forEach((report) => {
                if (report.status == "active") {
                    const reportObj: BusinessLabValue = {
                        label: report.name,
                        value: `${report.id}`
                    };
                    reports.push(reportObj);
                }
            });

            setBusinessReport(reports);
        }
    }, [data, isSuccess]);


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-sm justify-between"
                >
                    {searchValue
                        ? businessReports.find((report) => report.label === searchValue)?.label
                        : "Select Business Report"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command>
                    <CommandInput placeholder="Search Business Report..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Report found.</CommandEmpty>
                        <CommandGroup>
                            {businessReports.map((report) => (
                                <CommandItem
                                    key={report.value}
                                    value={report.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        setSearchValue(report.label);
                                    }}
                                >
                                    {report.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === report.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

}


export default BusinessReportDropdownComboBox;