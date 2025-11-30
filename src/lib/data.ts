import type { Student, Payment, Sale, BeltExam, Seminar } from './types';

export const students: Student[] = [
  {
    id: '1',
    name: 'Ana Silva',
    dob: '1995-03-12',
    cpf: '123.456.789-01',
    clothingSizes: { shirt: 'M', pants: '38' },
    contactInfo: { email: 'ana.silva@example.com', phone: '(11) 98765-4321' },
    emergencyContacts: [{ name: 'Carlos Silva', phone: '(11) 12345-6789', relationship: 'Pai' }],
    startDate: '2023-01-15',
    lastGradingDate: '2023-11-20',
    belt: 'Verde',
    medicalHistory: 'Nenhuma alergia conhecida. Teve uma leve torção no joelho em 2022.',
    notes: 'Aluna muito dedicada, mostra grande potencial.',
    status: 'Active',
    fikmFeePaid: true,
    fikmFeePaidDate: '2024-02-10',
    performanceData: 'Excelente desempenho em sparring, precisa melhorar as técnicas de solo.',
    avatarUrl: 'https://picsum.photos/seed/s1/200/200',
  },
  {
    id: '2',
    name: 'Bruno Costa',
    dob: '1988-07-25',
    cpf: '234.567.890-12',
    clothingSizes: { shirt: 'L', pants: '42' },
    contactInfo: { email: 'bruno.costa@example.com', phone: '(21) 91234-5678' },
    emergencyContacts: [{ name: 'Maria Costa', phone: '(21) 87654-3210', relationship: 'Esposa' }],
    startDate: '2022-05-10',
    belt: 'Azul',
    medicalHistory: 'Asma, carrega um inalador.',
    notes: 'Tem dificuldade com cardio, mas tem golpes potentes.',
    status: 'Active',
    fikmFeePaid: true,
    fikmFeePaidDate: '2024-01-20',
    performanceData: 'Alta precisão nos treinos de golpe. A resistência cai rapidamente durante exercícios prolongados.',
    avatarUrl: 'https://picsum.photos/seed/s2/200/200',
  },
  {
    id: '3',
    name: 'Carla Dias',
    dob: '2001-11-30',
    cpf: '345.678.901-23',
    clothingSizes: { shirt: 'S', pants: '36' },
    contactInfo: { email: 'carla.dias@example.com', phone: '(31) 95678-1234' },
    emergencyContacts: [{ name: 'Joana Dias', phone: '(31) 43210-8765', relationship: 'Mãe' }],
    startDate: '2023-08-01',
    belt: 'Amarela',
    medicalHistory: '',
    notes: 'Boa flexibilidade e aprende rápido.',
    status: 'Active',
    fikmFeePaid: false,
    fikmFeePaidDate: undefined,
    performanceData: 'Domina novas técnicas rapidamente. Falta confiança para aplicá-las sob pressão.',
    avatarUrl: 'https://picsum.photos/seed/s3/200/200',
  },
  {
    id: '4',
    name: 'Daniel Almeida',
    dob: '1992-09-18',
    cpf: '456.789.012-34',
    clothingSizes: { shirt: 'XL', pants: '44' },
    contactInfo: { email: 'daniel.almeida@example.com', phone: '(41) 98765-1234' },
    emergencyContacts: [{ name: 'Ricardo Almeida', phone: '(41) 12345-8765', relationship: 'Irmão' }],
    startDate: '2021-02-20',
    belt: 'Marrom',
    medicalHistory: 'Cirurgia no ombro em 2019. Evita levantamentos acima da cabeça.',
    notes: 'Artista marcial experiente, em transição do Karatê.',
    status: 'Inactive',
    fikmFeePaid: true,
    fikmFeePaidDate: '2023-03-15',
    performanceData: 'Postura e trabalho de pés fortes. Precisa se adaptar aos princípios de bloqueio e ataque simultâneos do Krav Maga.',
    avatarUrl: 'https://picsum.photos/seed/s4/200/200',
  },
  {
    id: '5',
    name: 'Eduarda Lima',
    dob: '1999-01-05',
    cpf: '567.890.123-45',
    clothingSizes: { shirt: 'M', pants: '40' },
    contactInfo: { email: 'eduarda.lima@example.com', phone: '(51) 91234-8765' },
    emergencyContacts: [{ name: 'Fernanda Lima', phone: '(51) 56789-4321', relationship: 'Irmã' }],
    startDate: '2024-01-10',
    belt: 'Branca',
    medicalHistory: 'Nenhum',
    notes: 'Nova aluna, muito entusiasmada.',
    status: 'Active',
    fikmFeePaid: true,
    fikmFeePaidDate: '2024-02-01',
    performanceData: 'Nível iniciante. Mostra boa coordenação.',
    avatarUrl: 'https://picsum.photos/seed/s5/200/200',
  },
];

export const payments: Payment[] = [
  { id: 'p1', studentId: '1', date: '2024-05-01', plan: { type: 'Mensal', value: 150 }, validUntil: '2024-06-01' },
  { id: 'p2', studentId: '2', date: '2024-04-10', plan: { type: 'Trimestral', value: 400 }, validUntil: '2024-07-10' },
  { id: 'p3', studentId: '3', date: '2024-03-15', plan: { type: 'Mensal', value: 150 }, validUntil: '2024-04-15' }, // Atrasado
  { id: 'p4', studentId: '4', date: '2023-12-01', plan: { type: 'Mensal', value: 150 }, validUntil: '2024-01-01' },
  { id: 'p5', studentId: '5', date: '2024-05-05', plan: { type: 'Mensal', value: 150 }, validUntil: '2024-06-05' },
];

export const sales: Sale[] = [
    { id: 'sa1', studentId: '1', studentName: 'Ana Silva', date: '2024-02-20', item: 'Uniforme', value: 250 },
    { id: 'sa2', studentId: '3', studentName: 'Carla Dias', date: '2024-03-05', item: 'Livro - "Fundamentos do Krav Maga"', value: 80 },
    { id: 'sa3', studentId: '2', studentName: 'Bruno Costa', date: '2024-04-11', item: 'Suplemento de Proteína', value: 120 },
    { id: 'sa4', studentId: '5', studentName: 'Eduarda Lima', date: '2024-05-15', item: 'Uniforme', value: 250 },
];

export const beltExams: BeltExam[] = [
  {
    id: 'be1',
    studentId: '1',
    examDate: '2024-06-30',
    examTime: '10:00',
    targetBelt: 'Azul',
    payment: {
      status: 'Pago',
      value: 200,
      paymentDate: '2024-06-01',
      paymentMethod: 'Cartão de Crédito',
    }
  },
  {
    id: 'be2',
    studentId: '3',
    examDate: '2024-06-30',
    examTime: '10:00',
    targetBelt: 'Laranja',
    payment: {
      status: 'Pendente',
      value: 180,
    }
  },
];

export const seminars: Seminar[] = [
  {
    id: 'sem1',
    studentId: '2',
    seminarName: 'Defesa Contra Ameaças com Faca',
    seminarDate: '2024-07-15',
    notes: 'Foco em desarmes e controle de distância.',
    payment: {
      status: 'Pago',
      value: 100,
      paymentDate: '2024-06-10',
      paymentMethod: 'Transferência'
    }
  },
  {
    id: 'sem2',
    studentId: '1',
    seminarName: 'Técnicas de Solo e Retenção',
    seminarDate: '2024-08-20',
    notes: 'Revisão de posições e finalizações básicas.',
    payment: {
      status: 'Pendente',
      value: 120,
    }
  }
];


export const getStudentById = (id: string) => students.find(s => s.id === id);
export const getPaymentsByStudentId = (studentId: string) => payments.filter(p => p.studentId === studentId);
