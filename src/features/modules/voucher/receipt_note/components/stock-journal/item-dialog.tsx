import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import { fetchGodownService } from "@/features/modules/godown/data/api";
import { fetchStockItemService } from "@/features/modules/stock_item/data/api";
import { useQueries } from "@tanstack/react-query";
import { GodownCombobox } from "./godown-combo-box";
import { StockItemCombobox } from "./stock-item-combo-box";

export function ItemDialog() {
    const results = useQueries({
        queries: [
            {
                queryKey: ["stockItems"],
                queryFn: fetchStockItemService,
            },
            {
                queryKey: ["godowns"],
                queryFn: fetchGodownService,
            },
        ],
    })

    const [stockItems, godowns] = results
    if (results.some((r) => r.isLoading)) return <div>Loading...</div>
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline">+ Add Item</Button>
            </DialogTrigger>
            <DialogContent className=" !max-w-10/12 h-8/12 grid grid-rows-[50px_1fr_50px]" onInteractOutside={(e) => {
                e.preventDefault();
            }}>
                <DialogHeader>
                    <div className="grid grid-cols-3 justify-center items-center gap-2">
                        <div></div>
                        <div className="  flex justify-center items-center gap-2">
                            <FormLabel >Item</FormLabel>

                            <StockItemCombobox stockItems={stockItems?.data?.data} />
                        </div>
                        <div></div>
                    </div>

                </DialogHeader>
                <div className="bg-amber-100">
                    <GodownCombobox godowns={godowns?.data?.data} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
