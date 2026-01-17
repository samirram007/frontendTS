'use client'


import type { Building } from '../data/schema'
import { FormAction } from './form-action'


interface Props {
    currentRow?: Building
}

export function ActionPages({ currentRow }: Props) {

    return <FormAction currentRow={currentRow} />

}
