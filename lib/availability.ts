import { addMinutes, formatISO, parseISO } from 'date-fns';
import { Appointment, Block, Professional } from '@/lib/types';

function toDate(date: string, hhmm: string) {
  return parseISO(`${date}T${hhmm}:00`);
}

function overlaps(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA < endB && startB < endA;
}

export function generateSlots({
  date,
  professional,
  duration,
  appointments,
  blocks
}: {
  date: string;
  professional: Professional;
  duration: number;
  appointments: Appointment[];
  blocks: Block[];
}) {
  const dayOfWeek = parseISO(`${date}T00:00:00`).getDay();
  const ranges = professional.weeklySchedule[String(dayOfWeek)] ?? [];
  const now = new Date();
  const slots: string[] = [];

  for (const [startTime, endTime] of ranges) {
    let cursor = toDate(date, startTime);
    const rangeEnd = toDate(date, endTime);

    while (cursor < rangeEnd) {
      const slotEnd = addMinutes(cursor, duration);
      if (slotEnd > rangeEnd) break;

      if (cursor < now) {
        cursor = addMinutes(cursor, 30);
        continue;
      }

      const busyByAppointment = appointments
        .filter((a) => a.professionalId === professional.id && a.status === 'active')
        .some((a) => overlaps(cursor, slotEnd, parseISO(a.start), parseISO(a.end)));

      const busyByBlock = blocks
        .filter((b) => b.professionalId === professional.id)
        .some((b) => overlaps(cursor, slotEnd, parseISO(b.start), parseISO(b.end)));

      if (!busyByAppointment && !busyByBlock) {
        slots.push(formatISO(cursor));
      }

      cursor = addMinutes(cursor, 30);
    }
  }

  return slots;
}
