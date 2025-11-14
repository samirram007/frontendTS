import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { useDeliveryNoteMutation } from '../../data/queryOptions';
import type { DeliveryNoteForm } from '../../data/schema';
import NarrationBox from './special/narration-box';


const PosFooter = () => {
    const mainForm = useFormContext<DeliveryNoteForm>();
    const { mutate: createDeliveryNote, isPending } = useDeliveryNoteMutation();
    const { watch } = mainForm;
    const total = watch("stockJournal.stockJournalEntries")?.reduce((acc, entry) => acc + (entry?.amount || 0), 0) || 0;
    // console.log("total: ", total)
    // const total = form.getValues("stockJournal.stockJournalEntries")?.reduce((acc, entry) => acc + (entry.amount || 0), 0) || 0;
    // console.log("Footer Level", mainForm.getValues())

    return (
        <div className="bg-red-300/50 grid grid-cols-[1fr_1fr] px-8">
            <div className="grid ">


                <Button
                    type="button" asChild onClick={() => {
                        console.log('Form submitted', mainForm.getValues());
                        createDeliveryNote(mainForm.getValues());
                    }}>

                    <NarrationBox type="textarea" form={mainForm} gapClass={''} className=" " name="narration" />
                </Button>



            </div>
            <div className="grid grid-rows-[1fr_1fr] grid-cols-[1fr_140px] items-center  justify-end">

                <div className="text-right font-bold  ">
                    Total: {total ? Number(total).toFixed(2) : 0}
                </div>
                <div className="text-left pl-2">
                    <Button
                        type="button"
                        variant="default"
                        className="h-7 focus:bg-black focus:text-white"
                        size="lg"
                        disabled={isPending}
                        onClick={() => {
                            console.log('Form submitted', mainForm.getValues());
                            createDeliveryNote(mainForm.getValues());
                        }}>Save....</Button>
                </div>
            </div>

        </div>


    )
}

export default PosFooter