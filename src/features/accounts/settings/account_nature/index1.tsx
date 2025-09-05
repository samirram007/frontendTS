import { useQuery } from "@tanstack/react-query"
import { fetchAccountNatureService } from "../../services/apis"


function AccountNature() {
    const {
        data: accountNatures,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['accountNatures'],
        queryFn: fetchAccountNatureService,
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {(error as Error).message}</div>

    return (
        <div>
            <h1>Account Natures</h1>
            <pre>{JSON.stringify(accountNatures, null, 2)}</pre>
        </div>
    )
}

export default AccountNature