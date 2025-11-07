import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import type { ReceiptNoteForm } from '../../data/schema';


const PosFooter = () => {
    const form = useFormContext<ReceiptNoteForm>();

    const total = form.watch("stockJournal.stockJournalEntries")?.reduce((acc, entry) => acc + (entry?.amount || 0), 0) || 0;
    console.log("total: ", total)
    // const total = form.getValues("stockJournal.stockJournalEntries")?.reduce((acc, entry) => acc + (entry.amount || 0), 0) || 0;
    console.log("Footer Level", form.watch('stockJournal'))

    return (
        <div className="bg-red-300/20 grid grid-cols-[1fr_1fr]">
            <div className="grid ">
                <div>
                    <div className="text-sm">Narration:</div>
                    <div contentEditable className="narration caret-accent caret-underscore caret-unde justify-self-end bg-black text-gray-100 w-full h-full text-sm  font-semibold  "></div>
                </div>
                <div className="narration"></div>
            </div>
            <div className="grid grid-rows-2 justify-end">

                <div className="text-right">
                    Total: {total ? total.toFixed(2) : 0}
                </div>
                <div className="text-right">
                    <Button type="submit">Save....</Button>
                </div>
            </div>

        </div>


    )
}

export default PosFooter