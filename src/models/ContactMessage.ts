import mongoose, { Schema, Model } from 'mongoose';

export interface IContactMessage {
  _id: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

type ContactMessageModel = Model<IContactMessage>;

const contactMessageSchema = new Schema<IContactMessage, ContactMessageModel>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ email: 1 });

const ContactMessage =
  (mongoose.models.ContactMessage as ContactMessageModel) ||
  mongoose.model<IContactMessage, ContactMessageModel>('ContactMessage', contactMessageSchema);

export default ContactMessage;
