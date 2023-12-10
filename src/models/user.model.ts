import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
  regNo: string;
  unemlehPic: string;
  selfiePic: string;
  isVerified: boolean;
}

const UserSchema = new mongoose.Schema<UserDoc>(
  {
    regNo: String,
    unemlehPic: String,
    selfiePic: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDoc>("User", UserSchema);
export default User;
