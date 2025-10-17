import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchTestItemByIdService, fetchTestItemReportTemplateByIdService, fetchTestItemReportTemplateService, fetchTestItemService, storeTestItemReportTemplateFileService, storeTestItemService, updateTestItemReportTemplateFileService, updateTestItemService } from "./api"
import type { TestItemConfiguration, TestItemForm } from "./schema"

const BASE_KEY = "test_items";
const TEST_ITEM_REPORT_KEY="test_item_reports";

export const testItemQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchTestItemByIdService(id) : fetchTestItemService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}

export function useTestItemMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: TestItemForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateTestItemService(data)
            }
            // Otherwise create
            return await storeTestItemService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Test Item mutation failed:", error)
        },
    })
}


export const testItemReportTemplateQueryOptions = (id?: number) => {

    return queryOptions({
        queryKey: id ? [TEST_ITEM_REPORT_KEY, id] : [BASE_KEY],
        queryFn: () =>
            id ? fetchTestItemReportTemplateByIdService(id) : fetchTestItemReportTemplateService(),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useTestItemReportTemplateFileMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: TestItemConfiguration  & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateTestItemReportTemplateFileService(data)
            }
            // Otherwise create
            return await storeTestItemReportTemplateFileService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TEST_ITEM_REPORT_KEY] })
        },
        onError: (error) => {
            console.error("Test Item mutation failed:", error)
        },
    })
}