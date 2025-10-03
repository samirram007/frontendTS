import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectContent } from "@radix-ui/react-select"





export const SelectDiscipline = () =>{
    return(
        <>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}