import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email already exists"],
      required: [true, "email is required"],
    },

    username: {
      types: String,
      required: [true, "email is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const User = models.user || model("user", UserSchema);
export default User;
