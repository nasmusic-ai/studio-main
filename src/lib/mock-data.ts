
export type Role = 'applicant' | 'staff' | 'treasurer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface BusinessApplication {
  id: string;
  applicantId: string;
  businessName: string;
  businessType: string;
  address: string;
  status: 'Draft' | 'Pending Review' | 'Payment Required' | 'Paid' | 'Approved' | 'Declined';
  submittedDate?: string;
  feeAmount?: number;
  documents: {
    name: string;
    url: string;
    status: 'Pending' | 'Verified' | 'Rejected';
  }[];
}

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Juan Dela Cruz', email: 'juan@example.com', role: 'applicant' },
  { id: 'u2', name: 'Maria Santos', email: 'maria.staff@municipality.gov.ph', role: 'staff' },
  { id: 'u3', name: 'Ricardo Reyes', email: 'ricardo.treasury@municipality.gov.ph', role: 'treasurer' },
  { id: 'u4', name: 'Admin User', email: 'admin@bilispermit.ph', role: 'admin' },
];

export const MOCK_APPLICATIONS: BusinessApplication[] = [
  {
    id: 'BP-2023-0001',
    applicantId: 'u1',
    businessName: 'Juan\'s Sari-Sari Store',
    businessType: 'Retail',
    address: '123 Rizal St, Brgy. Central, Quezon City',
    status: 'Pending Review',
    submittedDate: '2023-10-25',
    feeAmount: 2500,
    documents: [
      { name: 'DTI Registration', url: '#', status: 'Verified' },
      { name: 'Barangay Clearance', url: '#', status: 'Verified' },
      { name: 'Lease Contract', url: '#', status: 'Pending' },
    ],
  },
  {
    id: 'BP-2023-0002',
    applicantId: 'u1',
    businessName: 'Tech Solutions Hub',
    businessType: 'Service',
    address: '456 Bonifacio Ave, Quezon City',
    status: 'Payment Required',
    submittedDate: '2023-10-20',
    feeAmount: 5000,
    documents: [
      { name: 'SEC Registration', url: '#', status: 'Verified' },
      { name: 'Fire Safety Certificate', url: '#', status: 'Verified' },
    ],
  },
];
