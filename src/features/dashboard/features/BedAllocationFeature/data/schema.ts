
export interface IFloorInfo {
    id: number;
    section: string,
    floors: Floor[]
}

export interface Floor {
    id: number;
    floorName: string;
    floorType: string;
    code: string;
    rooms: Room[];
}

export interface Room {
    id: number;
    code: string;
    roomId: string;
    roomName: string;
    roomType: string;


    acType?: string;
    privacyLevel?: string;
    ventilatorSupported?: boolean;
    negativePressure?: boolean;
    otType?: string;

    totalBeds: number;
    bedOccupied: number;
    bedBooked: number;
    bedAvailable: number;

    beds: BedInfo[];
}

export interface BedInfo {
    id: number;
    bedId: string;
    bedNo: string;
    currentStatus: "available" | "occupied" | "booked";

    occupation?: OccupationDetails;
    booking?: BookingDetails;
}


export interface OccupationDetails {
    occupiedFrom: string; // ISO date
    expectedAvailableOn: string; // ISO date

    allocatedBy: User;

    patient: Patient;

    physician: Physician;
}

export interface BookingDetails {
    bookedFrom: string; // ISO date
    bookedTo: string; // ISO date

    bookedBy: User;

    patient?: Partial<Patient>;
}

export interface Patient {
    patientId: number;
    uhid?: string;
    name: string;
    gender?: "Male" | "Female" | "Other";
    age: number;
    contactNo?: string;
    emergencyContact?: string;
    diagnosis?: string;
    admissionDate?: string;
}


export interface Physician {
    id: number;
    name: string;
    specialization: string;
}

export interface User {
    userId: number;
    name: string;
}