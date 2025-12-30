import { Injectable } from '@angular/core';
import { TimeSlot } from '../models/slot.model';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private readonly slots: TimeSlot[] = [
    { label: '09:00 - 11:00', startHour: 9, endHour: 11, capacity: 20 },
    { label: '11:00 - 13:00', startHour: 11, endHour: 13, capacity: 20 },
    { label: '13:00 - 15:00', startHour: 13, endHour: 15, capacity: 20 },
    { label: '15:00 - 17:00', startHour: 15, endHour: 17, capacity: 20 },
    { label: '17:00 - 19:00', startHour: 17, endHour: 19, capacity: 20 },
    { label: '19:00 - 21:00', startHour: 19, endHour: 21, capacity: 20 }
  ];

  getAvailableSlots(selectedDate: Date): TimeSlot[] {
    const now = new Date();

    return this.slots.filter(slot => {
      // If booking for today, enforce 2-hour buffer
      if (this.isSameDate(selectedDate, now)) {
        return slot.startHour >= (now.getHours() + 2);
      }
      return true;
    });
  }

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const max = new Date();
    max.setDate(max.getDate() + 2);
    return max.toISOString().split('T')[0];
  }

  private isSameDate(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
