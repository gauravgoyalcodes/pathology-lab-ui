export interface BookingRequest {
  salutation: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;

  appointmentDate: string;
  timeSlot: string;

  doctorId: string;

  tests: string[];

  totalPrice: number;
  maxTat: string;

  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
}
