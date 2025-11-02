import { Button } from "@/components/ui/button";
import type { JobOrderType } from "../data/schema";
import { ReportDetailHeader } from "../pages/ReportingDetail";
import { Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import type { IJobOrderStoreSchema } from "../../booking/features/BookingDetails/data/schema";
import { useJobOderMutation } from "../../booking/features/BookingDetails/data/queryOptions";
import { toast } from "sonner";
import { bookingQueryOptions } from "../../booking/features/NewBooking/data/queryOptions";
import { useQueryClient } from "@tanstack/react-query";


const formatDateForInput = (dateString: string | Date | undefined | null) => {
  if (dateString == undefined || null) return;
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};






export function ReportBookingInformation({ jobOrderData }: { jobOrderData?: JobOrderType }) {

  const detailTextRef = useRef<HTMLDivElement>(null);
  const { mutate } = useJobOderMutation();
   const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onHandleCopy = () => {
    if (detailTextRef.current) {
      const html = detailTextRef.current.outerHTML;
      navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([detailTextRef.current.innerText], { type: "text/plain" }),
        }),
      ]);
    }
  }


  const onHandleDeliverToDesk = () => {
    if (jobOrderData && jobOrderData.expectedStartDate && jobOrderData.expectedEndDate) {
      const payload: IJobOrderStoreSchema = {
        id: jobOrderData?.id || undefined,
        stockJournalEntryId: jobOrderData?.stockJournalEntryId,
        stockItemId: jobOrderData.stockItemId,
        status: 'deliver_to_desk',
        startDate: new Date(jobOrderData.expectedStartDate).toISOString().split('T')[0],
        endDate: new Date(jobOrderData.expectedEndDate).toISOString().split('T')[0],
        voucherId: jobOrderData.testBooking.id
      }
      mutate(payload, {
        onSuccess() {
          toast.success("Job Order updated successfully");
          if (jobOrderData?.id) {
            const { queryKey } = bookingQueryOptions(jobOrderData?.id);
            queryClient.invalidateQueries({ queryKey });
            setTimeout(() => {
              navigate({
                to: '/transactions/booking',
              });
            }, 100);
          }

        }
      })
    }

  }


  return (
    <div className="relative">
      <ReportDetailHeader label="Booking Information" />
      {/* Booking Information */}
      <div >
        {/* <div ref={detailTextRef} className="grid grid-cols-2 gap-8">
                    first grid booking information
                    <div className="flex flex-col gap-1.5 text-[15px] font-medium">
                        <div className="grid grid-cols-[110px_20px_1fr] justify-evenly items-center">
                            <div>Booking Id</div>
                            <div>:</div>
                            <div>{jobOrderData?.testBooking?.voucherNo}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Patient</div>
                            <div>:</div>
                            <div>{jobOrderData?.testBooking?.voucherPatient?.patient?.name}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Address</div>
                            <div>:</div>
                            <div>{jobOrderData?.testBooking?.voucherPatient.patient?.address.line1}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Ref. Doctor</div>
                            <div>:</div>
                            <div>{jobOrderData?.testBooking?.voucherPatient?.physician.name}</div>
                        </div>
                    </div>
                    second grid booking information
                    <div className="flex flex-col gap-1.5 text-[15px] font-medium">
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Booking Date</div>
                            <div>:</div>
                            <div>{formatDateForInput(jobOrderData?.testBooking?.voucherDate)}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Age</div>
                            <div>:</div>
                            <div>{jobOrderData?.testBooking?.voucherPatient?.patient?.age}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Sex</div>
                            <div>:</div>
                            <div>{jobOrderData?.testBooking?.voucherPatient?.patient?.gender}</div>
                        </div>
                        <div className="grid grid-cols-[110px_20px_1fr]">
                            <div>Reporting Time</div>
                            <div>:</div>
                            <div>{formatDateForInput(jobOrderData?.expectedEndDate)}</div>
                        </div>
                    </div>
                </div> */}
        <div ref={detailTextRef} style={{ border: "2px" }}>
          <table
            className="table borderless"
            style={{
              width: "auto",
              textAlign: "left",
              margin: "0px !important",
              marginBottom: " 0px!important",
              marginLeft: '10px',
              fontWeight: 600
            }}
            cellSpacing="0px"
          >
            <tbody>
              <tr style={{ border: "0px" }}>
                <td colSpan={6} style={{ border: "0px", padding: "4px" }}></td>
              </tr>

              <tr style={{ border: "0px" }}>
                <td style={{ border: "0px", padding: "3px" }}>Booking ID </td>
                <td style={{ border: "0px", padding: "3px" }}>:</td>
                <td style={{ border: "0px", padding: "3px" }}>
                  {jobOrderData?.testBooking.voucherNo}
                </td>
                <td style={{ border: "0px", padding: "3px" }}>Booking Date</td>
                <td style={{ border: "0px", padding: "3px" }}>:</td>
                <td style={{ border: "0px", padding: "3px" }}>
                  {formatDateForInput(jobOrderData?.testBooking.voucherDate)}
                </td>
              </tr>

              <tr style={{ border: "0px" }}>
                <td style={{ border: "0px", width: "15%", padding: "3px" }}>
                  Patient
                </td>
                <td style={{ border: "0px", width: "5%", padding: "3px" }}>:</td>
                <td style={{ border: "0px", width: "40%", padding: "3px" }}>
                  {jobOrderData?.testBooking.voucherPatient.patient?.name}
                </td>
                <td style={{ border: "0px", width: "15%", padding: "3px" }}>
                  Age
                </td>
                <td style={{ border: "0px", width: "5%", padding: "3px" }}>:</td>
                <td style={{ border: "0px", width: "20%", padding: "3px" }}>
                  {jobOrderData?.testBooking.voucherPatient.patient?.age}
                </td>
              </tr>

              <tr>
                <td style={{ border: "0px", padding: "3px" }}>Address</td>
                <td style={{ border: "0px", padding: "3px" }}>:</td>
                <td style={{ border: "0px", padding: "3px" }}> {jobOrderData?.testBooking.voucherPatient.patient?.address.line1}</td>
                <td style={{ border: "0px", padding: "3px" }}>Sex</td>
                <td style={{ border: "0px", padding: "3px" }}>:</td>
                <td style={{ border: "0px", padding: "3px" }}> {jobOrderData?.testBooking.voucherPatient.patient?.gender}</td>
              </tr>

              <tr>
                <td style={{ border: "0px", padding: "3px" }}>Ref. Doctor</td>
                <td style={{ border: "0px", padding: "3px" }}>:</td>
                <td style={{ border: "0px", padding: "3px" }}>
                  {jobOrderData?.testBooking.voucherPatient?.physician?.name}
                </td>
                <td style={{ border: "0px", padding: "3px" }}>Reporting Time</td>
                <td style={{ border: "0px", padding: "3px" }}>:</td>
                <td style={{ border: "0px", padding: "3px" }}>
                  <span id="ReportingTime">{formatDateForInput(new Date())}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-6 flex gap-6 justify-center">
        <Button onClick={onHandleCopy}>Copy Contents</Button>
        <Link to={'/transactions/booking'}>
          <Button>Go To Booking</Button>
        </Link>
        {
          jobOrderData?.reportFile != null &&
          (
            <Button onClick={onHandleDeliverToDesk}>
              Deliver to Desk
            </Button>
          )
        }

      </div>

    </div>
  )
}


