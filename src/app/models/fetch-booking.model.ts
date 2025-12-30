// models/fetch-booking.model.ts
export interface FetchBooking {
  bookingId: string;
  patientId: string;
  salutation: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;

  appointmentDate: string; // yyyy-mm-dd
  timeSlot: string;

  doctorName: string;
  tests: any;

  totalPrice: number;
  maxTat: string;
  notes: string;

  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';

  phleboName?: string;
}
