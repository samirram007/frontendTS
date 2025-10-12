'use client'


import type { TestItem } from '../data/schema'
import { FormAction } from './form-action'


interface Props {
    currentRow?: TestItem
}

export function ActionPages({ currentRow }: Props) {

    return <FormAction currentRow={currentRow} />

}
