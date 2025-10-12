
import { useTestItem } from '../contexts/test_item-context'
import { ActionPages } from './action-page'


export function Pages() {
    const { currentRow, keyName } = useTestItem()

    return (
        <>
            <ActionPages
                key={`${keyName}-add`}
            />
            {currentRow ?

                <ActionPages
                    key={`${keyName}-edit-${currentRow.id}`}
                    currentRow={currentRow}
                />
                : <ActionPages
                    key={`${keyName}-add`}
                />
            }
        </>
    )
}
