import mongoose, {
  Schema,
  Types,
} from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  createdBy: Types.ObjectId;
  users: Types.ObjectId;
  createdAt: Date;
  upatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", projectSchema);
