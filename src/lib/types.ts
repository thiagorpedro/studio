export type Student = {
  id: string;
  name: string;
  dob: string;
  cpf: string;
  clothingSizes: {
    shirt: string;
    pants: string;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
  emergencyContacts: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  startDate: string;
  lastGradingDate?: string;
  belt: 'White' | 'Yellow' | 'Orange' | 'Green' | 'Blue' | 'Brown' | 'Black';
  medicalHistory: string;
  notes: string;
  status: 'Active' | 'Inactive';
  fikmFeePaid: boolean;
  performanceData: string;
  avatarUrl: string;
};

export type PaymentPlanType = 'Monthly' | 'Quarterly' | 'Annual';

export type PaymentPlan = {
  type: PaymentPlanType;
  value: number;
};

export type Payment = {
  id: string;
  studentId: string;
  date: string;
  plan: PaymentPlan;
  validUntil: string;
  creditNotes?: number;
};

export type Sale = {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  item: string;
  value: number;
};
