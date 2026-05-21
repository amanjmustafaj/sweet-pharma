import mongoose, { Schema, Model } from 'mongoose';

interface ITranslation {
  en: string;
  ku: string;
  ar: string;
}

interface IHeroSection {
  title: ITranslation;
  subtitle: ITranslation;
  backgroundImage: string;
  videoUrl?: string;
}

interface IService {
  id: string;
  icon: string;
  title: ITranslation;
  description: ITranslation;
  order: number;
  isActive: boolean;
}

interface Branch {
  id: string;
  title: { en: string; ku: string; ar: string };
  address: { en: string; ku: string; ar: string };
  email: string;
  laboratory: { en: string; ku: string; ar: string };
  phone: string;
  mapLink: string;
  images: string[];
  order: number;
  isActive: boolean;
}

interface IAbout {
  title: ITranslation;
  description: ITranslation;
  mission: ITranslation;
  vision: ITranslation;
  values: ITranslation;
}

interface ISocialMedia {
  id: string;
  platform: string;
  icon: string;
  url: string;
  order: number;
  isActive: boolean;
}

interface ISEO {
  title: ITranslation;
  description: ITranslation;
  keywords: ITranslation;
  ogImage?: string;
}

export interface IWebsiteContent {
  _id: mongoose.Types.ObjectId;
  hero: IHeroSection;
  services: IService[];
  branches: IBranch[];
  about: IAbout;
  socialMedia: ISocialMedia[];
  seo: ISEO;
  updatedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type WebsiteContentModel = Model<IWebsiteContent>;

const translationSchema = new Schema<ITranslation>(
  {
    en: { type: String, required: true },
    ku: { type: String, required: true },
    ar: { type: String, required: true },
  },
  { _id: false }
);

const heroSchema = new Schema<IHeroSection>(
  {
    title: { type: translationSchema, required: true },
    subtitle: { type: translationSchema, required: true },
    backgroundImage: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
  },
  { _id: false }
);

const serviceSchema = new Schema<IService>(
  {
    id: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: translationSchema, required: true },
    description: { type: translationSchema, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const branchSchema = new Schema<IBranch>(
  {
    id: { type: String, required: true },
    title: { type: translationSchema, required: true },
    address: { type: translationSchema, required: true },
    email: { type: String, required: false },
    laboratory: { type: translationSchema, required: false },
    phone: { type: String, required: true },
    mapLink: { type: String, required: true },
    images: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const aboutSchema = new Schema<IAbout>(
  {
    title: { type: translationSchema, required: true },
    description: { type: translationSchema, required: true },
    mission: { type: translationSchema, required: true },
    vision: { type: translationSchema, required: true },
    values: { type: translationSchema, required: true },
  },
  { _id: false }
);

const socialMediaSchema = new Schema<ISocialMedia>(
  {
    id: { type: String, required: true },
    platform: { type: String, required: true },
    icon: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const seoSchema = new Schema<ISEO>(
  {
    title: { type: translationSchema, required: true },
    description: { type: translationSchema, required: true },
    keywords: { type: translationSchema, required: true },
    ogImage: { type: String, default: '' },
  },
  { _id: false }
);

const websiteContentSchema = new Schema<IWebsiteContent, WebsiteContentModel>(
  {
    hero: { type: heroSchema, required: true },
    services: [serviceSchema],
    branches: [branchSchema],
    about: { type: aboutSchema, required: true },
    socialMedia: [socialMediaSchema],
    seo: { type: seoSchema, required: true },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
websiteContentSchema.index({ updatedAt: -1 });

const WebsiteContent =
  (mongoose.models.WebsiteContent as WebsiteContentModel) ||
  mongoose.model<IWebsiteContent, WebsiteContentModel>('WebsiteContent', websiteContentSchema);

export default WebsiteContent;
