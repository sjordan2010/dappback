import mongooseInstance from "./db.js";

const userSchema = mongooseInstance.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    lastClickTime: { type: Date, default: Date.now() },
    consecutiveClickDays: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UserModel = mongooseInstance.model("user", userSchema);

export default UserModel;
