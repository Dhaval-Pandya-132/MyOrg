import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "username"
    },
    email: {
      type: String
    },
    createdDate: {
      type: Date,
      required:"Created Date is required"
    },
    lastModifiedDate: {
      type: Date,
      default:Date.now
    },
  },
  {
    versionKey: false,
  }
);
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtual: true });

const model = mongoose.model("users", userSchema);

export default model;
