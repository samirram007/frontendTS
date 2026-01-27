import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchRoomByIdService, fetchRoomService, storeRoomService } from "./api";
import type { RoomForm } from "./schema";




const BASE_KEY = 'rooms';


export const roomQueryOptions = (id: string) => {
    return queryOptions({
        queryKey: [BASE_KEY, id],
        queryFn: () => id ? fetchRoomByIdService(id) : fetchRoomService(),
        staleTime: 1000 * 60 * 5,
        retry: 1
    });
};




export function useRoomMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RoomForm & { id?: string }) => {
            if (data.id) {
                // update service is to be returned
                return null;
            }
            return await storeRoomService(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
        },
        onError: (error) => {
            console.error("Room mutation failed:", error)
        }
    })
}