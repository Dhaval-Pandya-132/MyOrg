import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    orgName: {
        type: String,
        required:"Org name required",
        unique: "Organization name should be unique"
      }, 
    orgID: {
        type: String
    },
    email: {
      type: String,
      required:"Org email required",
      unique: "Organization email should be unique"
    },
    phoneNumber: {
      type: String
    },
    address: {
      type: String
    },
    createdDate: {
      type: Date,
      default:Date.now,
      required:"Created Date is required"
    }
  },
  {
    versionKey: false,
  }
);
orgSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orgSchema.set("toJSON", { virtual: true });

const model = mongoose.model("organization", orgSchema);

export default model;
