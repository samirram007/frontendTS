import { useQuery } from "@tanstack/react-query";
import { departmentQueryOptions } from "../../department/data/queryOptions";
import { useEffect, useState } from "react";
import type { Department } from "../../department/data/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

type DepartmentLabelValue = {
    label: string,
    value: string
}



const DepartmentComboBox = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [departmentList, setDepartmentList] = useState<DepartmentLabelValue[]>([]);
    const { data, isSuccess } = useQuery(departmentQueryOptions());


    useEffect(() => {
        if (isSuccess && data) {
            const departments: DepartmentLabelValue[] = [];

            data.data.forEach((department: Department) => {
                const reportObj: DepartmentLabelValue = {
                    label: department.name,
                    value: department.id
                };
                departments.push(reportObj);
            });

            setDepartmentList(departments);
        }
    }, [data, isSuccess]);


    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-sm justify-between"
                    >
                        {value
                            ? departmentList.find((dept) => dept.label === value)?.label
                            : "Select Department"}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Department..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No Department found.</CommandEmpty>
                            <CommandGroup>
                                {departmentList.map((dept) => (
                                    <CommandItem
                                        key={dept.value}
                                        value={dept.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {dept.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === dept.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>

    )
}


export default DepartmentComboBox;