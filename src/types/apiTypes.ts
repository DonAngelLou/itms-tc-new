// src/types/apiTypes.ts

export interface DriverData {
  id?: number;
  name: string;
  license_number: string;
  transport_company?: string; // Optional relation to Transport Company
  nfc_code?: string;
  status?: 'in_terminal' | 'departed' | 'arrived'; // Matches status options in backend
  profile_picture?: string; // URL if profile pictures are being stored
  last_nfc_tap_time?: string; // Optional for NFC tap tracking
}

export interface Booking {
  id: string;
  booking_code: string;
  passenger_name: string;
  passenger_contact?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  trip?: Trip; // Reference to Trip interface
  created_at?: string;
  total_passengers?: number;
  total_packages?: number;
  payment_status?: 'pending' | 'approved' | 'rejected'; // Optional payment status
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Trip {
  id?: string;
  destination: Destination; // Reference to Destination interface
  vehicle: Vehicle;
  driver: DriverData;
  departure_time: string;
  price: number;
  is_package: boolean;
  delivery_type: string;
  status?: 'scheduled' | 'departed' | 'arrived'; // Optional status
}

export interface Vehicle {
  id?: number;
  vehicle_type: string;
  model_name?: string;
  year?: number;
  plate_number: string;
  color?: string;
  capacity: number;
  status?: 'parked' | 'maintenance' | 'operational';
  transport_company?: string; // Optional relation to Transport Company
  violation_count?: number;
  qr_code?: string; // URL if storing QR code images
}

export interface Destination {
  id: number;
  name: string;
  description?: string;
  location: string;
}

export interface PaymentProofData {
  booking: number;
  payment_method: string;
  proof_image: File;
  submitted_at?: string; // Date when payment was submitted
  status?: 'pending' | 'approved' | 'rejected'; // Payment proof status
}

export interface FeedbackData {
  id: number;
  feedback: string;
  rating: number;
  vehicle?: number; // Optional relation to Vehicle
  trip?: number; // Optional relation to Trip
  name?: string; // Name of the feedback giver
  cellphone?: string; // Contact number of feedback giver
  submitted_at?: string; // Timestamp of feedback submission
}

export interface SupportData {
  id?: number;
  subject: string;
  message: string;
  status?: 'open' | 'closed'; // Optional status of the support request
  created_at?: string;
  updated_at?: string;
}

export interface MaintenanceData {
  id?: number;
  vehicle: string; // Vehicle ID or name
  scheduled_date: string;
  description: string;
  is_completed: boolean;
  created_at?: string; // Optional creation timestamp
}

export interface Notification {
  id: number;
  user: number; // User ID
  message: string;
  created_at: string;
  seen: boolean;
}

export interface UserProfile {
  id: number;
  user: number; // User ID
  transport_company?: string; // Optional Transport Company relation
  role: 'admin' | 'company_rep' | 'ltt_admin';
  permissions_level?: number; // Optional permissions level
  backup_email?: string;
  backup_phone?: string;
}

export interface Violation {
  id: number;
  violation_type: string;
  description?: string;
  date: string;
  status: 'unresolved' | 'resolved';
  driver?: DriverData; // Optional relation to Driver
  vehicle?: Vehicle; // Optional relation to Vehicle
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  created_at: string;
  is_public: boolean;
}

export interface AuditLog {
  id: number;
  user: number; // User ID
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  model_name: string;
  object_id: number;
  timestamp: string;
  details?: string; // Optional details of the action
}
