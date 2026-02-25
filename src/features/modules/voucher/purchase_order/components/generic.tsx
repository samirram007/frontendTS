import { Controller } from "react-hook-form";
import { usePurchaseForm } from "../contexts/form-context";
import type { PurchaseOrderForm } from "../data/schema";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const TextBox = ({ name, label }: { name: keyof PurchaseOrderForm; label: string }) => {
    const form = usePurchaseForm();
    return (
        <Controller
            control={form.control}
            name={name as any}
            render={({ field }) => (
                <div className="space-y-1">
                    <label className="text-sm font-medium">{label}</label>
                    <Input {...field} />
                </div>
            )}
        />
    );
};

export const TextAreaBox = ({ name, label }: { name: keyof PurchaseOrderForm; label: string }) => {
    const form = usePurchaseForm();
    return (
        <Controller
            control={form.control}
            name={name as any}
            render={({ field }) => (
                <div className="space-y-1">
                    <label className="text-sm font-medium">{label}</label>
                    <Textarea {...field} />
                </div>
            )}
        />
    );
};