import { useField } from "formik";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ISelectBoxProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
}

export const SelectBox: React.FC<ISelectBoxProps> = ({
  label,
  name,
  options,
}) => {
  const [field, , helpers] = useField(name);

  return (
    <div className="grid grid-cols-[120px_1fr] items-center max-w-md w-full">
      {label && <label className="mb-2 text-app-small font-medium">{label}</label>}
      <Select value={field.value} onValueChange={(val) => helpers.setValue(val)}>
        <SelectTrigger 
        className="w-full px-4 py-[19px] text-black
        border  border-gray-200 rounded-lg shadow-app-input
         bg-white text-app-base sm:text-app-base
         focus:outline-none focus:ring-2 
          focus:ring-[#D9F275] focus:border-[#d4f455]
          transition">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
