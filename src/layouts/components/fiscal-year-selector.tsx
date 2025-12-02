import { useAuth } from "@/features/auth/contexts/AuthContext";
import { Link } from "@tanstack/react-router";
import { Route as UserFiscalYearRoute } from '../../routes/_protected/(auth)/user-fiscal-year/_layout/index';
type FiscalYearSelectorProps = {
    visible: boolean
}

const FiscalYearSelector = (props: FiscalYearSelectorProps) => {
    const { userFiscalYear } = useAuth();
    const { visible } = props
    if (!visible) return null;
    return (
        <div className="text-xs card">
            <div>Company / Financial Year</div>
            <div className="font-bold cursor-pointer" >
                <Link to={UserFiscalYearRoute.to} className="hover:underline">
                    {userFiscalYear?.fiscalYear?.name || "No Fiscal Year Assigned"}
                </Link>
            </div>
        </div>
    )
}

export default FiscalYearSelector