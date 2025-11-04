import { type UseFormReturn } from "react-hook-form";
import type { ReceiptNoteForm, StockJournalForm } from "../../data/schema";
import StockJournal from "./stock-journal";

type Props = {
    mainForm: UseFormReturn<ReceiptNoteForm>;
}

const PosBody = (props: Props) => {
    const { mainForm } = props;

    const handleDialogSave = (journalValues: StockJournalForm) => {
        mainForm.setValue("stockJournal", journalValues)
    }
    // console.log(mainForm.getValues("stockJournal"))
    return (
        <div className="grid grid-cols-1   overflow-y-scroll px-2  ">

            <StockJournal
                onSave={handleDialogSave}
                defaultValues={mainForm.getValues("stockJournal") as StockJournalForm} />
        </div>
    )
}

export default PosBody