import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
}

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model<User>('User', UserSchema);

export default User;
