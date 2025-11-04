import { Button } from "@/components/ui/button"
import type { Row } from "@tanstack/react-table"
import type { Role } from "../data/schema"

import { Route as RolePermissionRoute } from '@/routes/_authenticated/administration/_layout/role/_layout/$id/_module/'

import { useNavigate } from '@tanstack/react-router'
interface DataTableRowActionsProps {
    row: Row<Role>
}

const ActionPermission = (props: DataTableRowActionsProps) => {
    const navigate = useNavigate()
    const { row } = props
    console.log(row)
    return (
        // <>Permission</>
        <Button onClick={() => navigate({
            to: RolePermissionRoute.to,
            params: { id: row.original.id! },
        })}>
            Permission
        </Button>
    )
}

export default ActionPermission



//  const { row } = props
//     const id = row.original.id
//     console.log(id)
//     return (

//         <Button asChild variant="link" className="text-blue-600 underline" size="sm"  >
//             <Link to={RolePermissionRoute.to} params={{ id: id! }}>
//                 Check Permissions
//             </Link>
//         </Button>
//     )