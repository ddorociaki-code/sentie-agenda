export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

export type Professional = {
  id: string;
  name: string;
  weeklySchedule: Record<string, [string, string][]>;
};

export type Appointment = {
  id: string;
  serviceId: string;
  professionalId: string;
  start: string;
  end: string;
  fullName: string;
  whatsapp: string;
  status: 'active' | 'cancelled';
  createdAt: string;
};

export type Block = {
  id: string;
  professionalId: string;
  start: string;
  end: string;
  reason?: string;
  createdAt: string;
};
