'use client'


import type { Room } from '../data/schema'
import { FormAction } from './form-action'


interface Props {
    currentRow?: Room
}

export function ActionPages({ currentRow }: Props) {

    return <FormAction currentRow={currentRow} />

}
