'use client'


import type { Bed } from '../data/schema'
import { FormAction } from './form-action'


interface Props {
    currentRow?: Bed
}

export function ActionPages({ currentRow }: Props) {

    return <FormAction currentRow={currentRow} />

}
