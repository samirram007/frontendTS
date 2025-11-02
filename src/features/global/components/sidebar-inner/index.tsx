import type { JSX } from "react"
import SidebarNav from "./sidebar-nav"

interface SidebarNavProps {
    items: {
        href: string
        visible?: boolean
        title: string
        icon: JSX.Element
    }[]
}
const SidebarInner = ({ items }: SidebarNavProps) => {
    return (
        <aside className='bg-blue-400/20 top-0 h-full xl:sticky xl:w-3/12 '>
            <SidebarNav items={items} />
        </aside>
    )
}
export default SidebarInner