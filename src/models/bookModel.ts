import mongoose, {
  Document,
  Schema,
} from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    year: number;
    price: number;
}

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true }
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
