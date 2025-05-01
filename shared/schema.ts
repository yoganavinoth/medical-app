import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
});

export const doctors = pgTable("doctors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  imageUrl: text("image_url"),
  rating: integer("rating"),
  reviewCount: integer("review_count"),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  doctorId: integer("doctor_id").notNull(),
  serviceId: integer("service_id"),
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("scheduled"),
  notes: text("notes"),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  isUser: boolean("is_user").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users);
export const insertDoctorSchema = createInsertSchema(doctors);
export const insertServiceSchema = createInsertSchema(services);
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true });

// Select types
export type User = typeof users.$inferSelect;
export type Doctor = typeof doctors.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Insert types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertDoctor = z.infer<typeof insertDoctorSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
