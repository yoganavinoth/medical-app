import { 
  users, doctors, services, appointments, chatMessages,
  type User, type Doctor, type Service, type Appointment, type ChatMessage,
  type InsertUser, type InsertDoctor, type InsertService, type InsertAppointment, type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Doctor methods
  getDoctors(): Promise<Doctor[]>;
  getDoctor(id: number): Promise<Doctor | undefined>;
  createDoctor(doctor: InsertDoctor): Promise<Doctor>;
  
  // Service methods
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Appointment methods
  getAppointments(userId: number): Promise<Appointment[]>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  deleteAppointment(id: number): Promise<boolean>;
  
  // Chat methods
  getChatMessages(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private doctors: Map<number, Doctor>;
  private services: Map<number, Service>;
  private appointments: Map<number, Appointment>;
  private chatMessages: Map<number, ChatMessage>;
  
  private userCurrentId: number;
  private doctorCurrentId: number;
  private serviceCurrentId: number;
  private appointmentCurrentId: number;
  private chatMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.doctors = new Map();
    this.services = new Map();
    this.appointments = new Map();
    this.chatMessages = new Map();
    
    this.userCurrentId = 1;
    this.doctorCurrentId = 1;
    this.serviceCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.chatMessageCurrentId = 1;
    
    // Initialize with sample doctors and services
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample doctors
    const sampleDoctors: InsertDoctor[] = [
      { name: "Dr. Sarah Johnson", specialty: "Cardiologist", imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2", rating: 4, reviewCount: 128 },
      { name: "Dr. Michael Chen", specialty: "Neurologist", imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d", rating: 4, reviewCount: 94 },
      { name: "Dr. Rebecca Martinez", specialty: "Dermatologist", imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f", rating: 5, reviewCount: 156 },
      { name: "Dr. James Wilson", specialty: "Orthopedic Surgeon", imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7", rating: 4, reviewCount: 112 },
      { name: "Dr. Emily Patel", specialty: "Pediatrician", imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d", rating: 5, reviewCount: 143 },
      { name: "Dr. Robert Garcia", specialty: "Psychiatrist", imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54", rating: 4, reviewCount: 87 }
    ];
    
    sampleDoctors.forEach(doctor => this.createDoctor(doctor));
    
    // Add medical services
    const sampleServices: InsertService[] = [
      { name: "Symptom to Diagnosis", description: "Enter your symptoms and get possible diagnoses based on clinical data.", iconName: "ri-mental-health-line" },
      { name: "Drug Interaction Checker", description: "Check for potential interactions between medications you're taking.", iconName: "ri-medicine-bottle-line" },
      { name: "Lab Test Recommendation", description: "Get personalized lab test recommendations based on your health profile.", iconName: "ri-test-tube-line" },
      { name: "ICD-10 Code Finder", description: "Search and find the right diagnosis code for medical billing and records.", iconName: "ri-file-list-3-line" },
      { name: "Prescription Explanation (PDF)", description: "Upload your prescription PDF and get detailed explanations of medications.", iconName: "ri-file-pdf-line" },
      { name: "Specialist Referral Suggestion", description: "Get suggestions for specialists based on your condition and location.", iconName: "ri-user-search-line" },
      { name: "Heart Disease Risk Prediction", description: "Assess your risk of heart disease based on health metrics and lifestyle factors.", iconName: "ri-heart-line" },
      { name: "Blood Test Report Analyzer", description: "Upload and analyze your blood test results with expert guidance.", iconName: "ri-drop-line" },
      { name: "Follow-up Advice Generator", description: "Receive personalized follow-up care recommendations after treatment.", iconName: "ri-calendar-check-line" },
      { name: "X-Ray Analyzer", description: "Upload X-ray images for preliminary analysis and guidance.", iconName: "ri-scan-line" },
      { name: "ECG Analyzer", description: "Upload ECG reports for preliminary interpretation and guidance.", iconName: "ri-heart-pulse-line" }
    ];
    
    sampleServices.forEach(service => this.createService(service));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Doctor methods
  async getDoctors(): Promise<Doctor[]> {
    return Array.from(this.doctors.values());
  }
  
  async getDoctor(id: number): Promise<Doctor | undefined> {
    return this.doctors.get(id);
  }
  
  async createDoctor(insertDoctor: InsertDoctor): Promise<Doctor> {
    const id = this.doctorCurrentId++;
    const doctor: Doctor = { ...insertDoctor, id };
    this.doctors.set(id, doctor);
    return doctor;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }
  
  // Appointment methods
  async getAppointments(userId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      (appointment) => appointment.userId === userId,
    );
  }
  
  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }
  
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const appointment: Appointment = { ...insertAppointment, id };
    this.appointments.set(id, appointment);
    return appointment;
  }
  
  async updateAppointment(id: number, appointmentUpdate: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    
    const updatedAppointment = { ...appointment, ...appointmentUpdate };
    this.appointments.set(id, updatedAppointment);
    return updatedAppointment;
  }
  
  async deleteAppointment(id: number): Promise<boolean> {
    return this.appointments.delete(id);
  }
  
  // Chat methods
  async getChatMessages(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((message) => message.userId === userId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
  
  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageCurrentId++;
    const chatMessage: ChatMessage = { ...insertChatMessage, id };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
}

export const storage = new MemStorage();
