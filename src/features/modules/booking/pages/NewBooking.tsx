import NewBookingFeature from "../features/NewBooking/NewBookingFeature";







const NewBooking = () => {
  return (
    <div className="text-sm py-5">
      {/* This component includes all patient search to lab tests search to select to bill the patient */}
      <NewBookingFeature />
    </div>
  )
}


export default NewBooking;