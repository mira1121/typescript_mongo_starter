import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  regNo: string;
  unemlehPic: string;
  selfiePic: string;
  isCardVerified: boolean;
  isUserVerified: boolean;
  isRegisterVerified: boolean;
}

const UserSchema = new mongoose.Schema<UserDoc>(
  {
    firstName: String,
    lastName: String,
    regNo: String,
    unemlehPic: String,
    selfiePic: String,
    isCardVerified: { type: Boolean, default: false },
    isUserVerified: { type: Boolean, default: false },
    isRegisterVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDoc>("Card", UserSchema);
export default User;
