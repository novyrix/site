/**
 * Novyrix Application Types
 * Type definitions for the entire application
 */

import { Role, QuoteStatus, ProjectStatus, ServiceType } from "@prisma/client";

// Re-export Prisma enums for convenience
export { Role, QuoteStatus, ProjectStatus, ServiceType };

// User Types
export interface User {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  role: Role;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser extends Omit<User, "password"> {}

// Quote Types
export interface WebsiteQuoteData {
  basePrice: number;
  hasBlog: boolean;
  hasGallery: boolean;
  hasBooking: boolean;
  hasEcommerce: boolean;
  hasApi: boolean;
  hostingType: "basic" | "advanced" | "own" | null;
  carePlan: boolean;
  ecommercePlan: boolean;
}

export interface SoftwareQuoteData {
  projectType: string;
  projectStage: string;
  features: string[];
  complexity: string;
}

export interface AutomationQuoteData {
  businessArea: string;
  currentTools: string[];
  hoursPerWeek: string;
}

export interface Quote {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: QuoteStatus;
  basePrice?: number;
  hasBlog: boolean;
  hasGallery: boolean;
  hasBooking: boolean;
  hasEcommerce: boolean;
  hasApi: boolean;
  hostingType?: string;
  carePlan: boolean;
  ecommercePlan: boolean;
  projectType?: string;
  projectStage?: string;
  features?: any;
  complexity?: string;
  businessArea?: string;
  currentTools?: any;
  hoursPerWeek?: string;
  oneTimeTotal: number;
  monthlyTotal?: number;
  yearlyTotal?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
}

// Calculator Types
export interface CalculatorStep {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<any>;
}

export interface WebsiteGoal {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
  addOns: string[];
}

export interface PricingBlock {
  id: string;
  name: string;
  description: string;
  price: number;
  identifier: string;
  isActive: boolean;
}

// Project Types
export interface Project {
  id: string;
  quoteId: string;
  userId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate?: Date;
  estimatedEndDate?: Date;
  actualEndDate?: Date;
  contractValue: number;
  paidAmount: number;
  hasCarePlan: boolean;
  carePlanExpiry?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Types
export interface DashboardStats {
  totalQuotes: number;
  activeProjects: number;
  totalRevenue: number;
  pendingInvoices: number;
}

export interface QuoteListItem {
  id: string;
  serviceType: ServiceType;
  status: QuoteStatus;
  oneTimeTotal: number;
  monthlyTotal?: number;
  createdAt: Date;
}

export interface ProjectListItem {
  id: string;
  name: string;
  status: ProjectStatus;
  contractValue: number;
  progress: number;
  startDate?: Date;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  company?: string;
  phone?: string;
}

export interface QuoteFormData {
  serviceType: ServiceType;
  websiteData?: Partial<WebsiteQuoteData>;
  softwareData?: Partial<SoftwareQuoteData>;
  automationData?: Partial<AutomationQuoteData>;
  notes?: string;
}

// Component Props Types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export interface CardProps {
  variant?: "default" | "elevated" | "interactive" | "pricing";
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Animation Types
export interface AnimationVariants {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
