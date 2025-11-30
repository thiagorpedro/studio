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
  belt: 'Branca' | 'Amarela' | 'Laranja' | 'Verde' | 'Azul' | 'Marrom' | 'Preta';
  medicalHistory: string;
  notes: string;
  status: 'Active' | 'Inactive';
  fikmFeePaid: boolean;
  fikmFeePaidDate?: string;
  performanceData: string;
  avatarUrl: string;
};

export type PaymentPlanType = 'Mensal' | 'Trimestral' | 'Anual';

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

export type BeltExam = {
  id: string;
  studentId: string;
  examDate: string;
  examTime: string;
  targetBelt: 'Amarela' | 'Laranja' | 'Verde' | 'Azul' | 'Marrom' | 'Preta';
  payment: {
    status: 'Pago' | 'Pendente';
    value: number;
    paymentDate?: string;
    paymentMethod?: 'Cartão de Crédito' | 'Transferência' | 'Dinheiro';
  };
};
