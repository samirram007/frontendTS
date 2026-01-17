'use client'


import type { Floor } from '../data/schema'
import { FormAction } from './form-action'


interface Props {
    currentRow?: Floor
}

export function ActionPages({ currentRow }: Props) {

    return <FormAction currentRow={currentRow} />

}
