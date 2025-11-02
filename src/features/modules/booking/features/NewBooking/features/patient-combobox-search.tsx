import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetPatientListQuery } from "./CreatePatientFeature/data/queryOptions";
import { usePatient } from "../../../contexts/patient-context";
import { Label } from "@/components/ui/label";

interface IPatientOption{
    value: string,
    label: string
}




const PatientComboBoxSearch = () =>{
    const {data,isSuccess} = useGetPatientListQuery();
    const {setPatient} = usePatient();
    const [patientList,setPatientList] = useState<IPatientOption[]>([]);
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("");


    useEffect(()=>{
        if(isSuccess){
            let patientOptionList: IPatientOption[] = [];
            data.data.data.forEach((patient)=>{
                const patientObj: IPatientOption = {
                    label: patient.name,
                    value: `${patient.id}`
                };
                patientOptionList.push(patientObj);
            });

            setPatientList(patientOptionList);
        }
    },[data,isSuccess]);

    return(
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <div className="grid grid-cols-[100px_1fr] items-center">
                    <div>
                        <Label className="font-bold text-[13px]">
                            Patient Select
                        </Label>
                    </div>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-sm justify-between"
                        >
                        {value
                            ? patientList.find((patient) => patient.value === value)?.label
                            : "Select Patient..."}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                </div>
                
                <PopoverContent className="w-sm p-0">
                    <Command>
                    <CommandInput placeholder="Search Patient..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No Patient found.</CommandEmpty>
                        <CommandGroup>
                        {patientList.map((patient) => (
                            <CommandItem
                            key={patient.value}
                            value={patient.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue);
                                setOpen(false);
                                const patientSelected = data?.data.data.find((patient)=> patient.id == Number(currentValue));
                                if(patientSelected){
                                    setPatient(patientSelected);
                                }
                                
                            }}
                            >
                            {patient.label}
                            <Check
                                className={cn(
                                "ml-auto",
                                value === patient.value ? "opacity-100" : "opacity-0"
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


export default PatientComboBoxSearch;