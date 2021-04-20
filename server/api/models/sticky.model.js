import mongoose from "mongoose";


const stickySchema = new mongoose.Schema(
    {
        sid: {
            type: String,
            required: "summary / title is required"
        },
        rotate: {
            type: Int16Array
        },
        text: {
            type: String
        },
        lastNoteCreated: {
            type: String
        },
        createdDate: {
            type: Date,
            default: Date.now,
            required: "Created Date is required"
        }
    }
);

stickySchema.virtual("id").get(function () {
    return this._id.toHexString();
});

stickySchema.set("toJSON", { virtual: true });

const model = mongoose.model("events", stickySchema);

export default model;