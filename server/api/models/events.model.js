import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        summary: {
            type: String,
            required: "summary / title is required"
        },
        description: {
            type: String
        },
        googleEventID: {
            type: String
        },
        zoomMeetingID: {
            type: String
        },
        start: {
            date: {
                type: Date
            },
            time: {
                type: String
            },
            timezone: {
                type: String
            }
        },
        end: {
            date: {
                type: Date
            },
            time: {
                type: String
            },
            timezone: {
                type: String
            }
        },
        createdDate: {
            type: Date,
            default: Date.now,
            required: "Created Date is required"
        },
        lastModifiedDate: {
            type: Date,
        },
        userId: {
            type: String
        }
    },
    {
        versionKey: false,
    }
);
eventSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

eventSchema.set("toJSON", { virtual: true });

const model = mongoose.model("events", eventSchema);

export default model;
