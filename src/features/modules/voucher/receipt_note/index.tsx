'use client'


import type { ReceiptNoteProps } from './components/form-action';
import FormAction from './components/form-action';
import { FormProvider } from './contexts/form-context';





const ReceiptNote = ({ currentRow }: ReceiptNoteProps) => {
    return (
        <FormProvider>
            <FormAction currentRow={currentRow} />

        </FormProvider>
    )
}

export default ReceiptNote
