import mongoose, { Schema, Document } from 'mongoose';

interface CatalogDocument extends Document {
  name: string;
  vertical: string;
  isPrimary: boolean;
  locales: string[];
  indexedAt: Date;
  userId: string;
}

const catalogSchema = new Schema({
  name: { type: String, required: true },
  vertical: { type: String, enum: ['fashion', 'home', 'general'], required: true },
  isPrimary: { type: Boolean, default: false },
  locales: { type: [String], required: true },
  indexedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

catalogSchema.index({ userId: 1, name: 1 }, { unique: true });

const Catalog = mongoose.model<CatalogDocument>('Catalog', catalogSchema);
export default Catalog;
