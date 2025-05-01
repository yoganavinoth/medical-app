import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertAppointmentSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all doctors
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await storage.getDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctors" });
    }
  });

  // Get doctor by ID
  app.get("/api/doctors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid doctor ID" });
      }

      const doctor = await storage.getDoctor(id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch doctor" });
    }
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service by ID
  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Create an appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });

  // Get user's appointments
  app.get("/api/appointments", async (req, res) => {
    try {
      // For demo purposes, use a fixed user ID of 1
      // In a real app, this would come from authenticated user session
      const userId = 1;
      const appointments = await storage.getAppointments(userId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  // Update an appointment
  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const appointmentData = req.body;
      const updatedAppointment = await storage.updateAppointment(id, appointmentData);
      
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update appointment" });
    }
  });

  // Delete an appointment
  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }

      const success = await storage.deleteAppointment(id);
      if (!success) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete appointment" });
    }
  });

  // Get chat messages
  app.get("/api/chat", async (req, res) => {
    try {
      // For demo purposes, use a fixed user ID of 1
      // In a real app, this would come from authenticated user session
      const userId = 1;
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  // Create a chat message
  app.post("/api/chat", async (req, res) => {
    try {
      // For demo purposes, add a fixed user ID of 1
      // In a real app, this would come from authenticated user session
      const messageData = {
        ...req.body,
        userId: 1,
        timestamp: new Date()
      };
      
      const validatedMessage = insertChatMessageSchema.parse(messageData);
      const message = await storage.createChatMessage(validatedMessage);
      
      res.status(201).json(message);

      // If this is a user message, generate an AI response
      if (validatedMessage.isUser) {
        setTimeout(async () => {
          const aiResponse = {
            userId: 1,
            isUser: false,
            message: generateAIResponse(validatedMessage.message),
            timestamp: new Date()
          };
          await storage.createChatMessage(aiResponse);
        }, 1000); // Simulate AI thinking time
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// A simple function to generate AI responses
function generateAIResponse(userMessage: string): string {
  const userMsgLower = userMessage.toLowerCase();
  
  if (userMsgLower.includes("appointment") || userMsgLower.includes("book")) {
    return "To book an appointment, please go to the Appointments section and select a doctor, date, and time that works for you.";
  } else if (userMsgLower.includes("headache") || userMsgLower.includes("pain")) {
    return "I understand you're experiencing discomfort. Headaches can have many causes including stress, dehydration, or eye strain. If it's severe or persistent, please consult with one of our doctors.";
  } else if (userMsgLower.includes("service") || userMsgLower.includes("help")) {
    return "We offer various medical services including symptom diagnosis, drug interaction checking, lab test recommendations, and more. You can explore them in the Services section.";
  } else if (userMsgLower.includes("doctor") || userMsgLower.includes("specialist")) {
    return "We have many qualified specialists in our network. You can view their profiles and specialties in the appointment booking section.";
  } else {
    return "Thank you for your message. How else can I assist you with your healthcare needs today?";
  }
}
