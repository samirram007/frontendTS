import type { IResponseInterface } from "../../booking/data/schema";


type Status = "active" | "inactive";


export interface IBusinessReport {
    id: number,
    name: string,
    code: string,
    status: Status,
    description: string
}



export interface IBusinessReportResponse extends IResponseInterface {
    data: IBusinessReport[]
}