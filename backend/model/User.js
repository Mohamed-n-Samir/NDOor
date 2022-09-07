const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "first name is required"],
			trim: true,
			text: true,
		},
		lastName: {
			type: String,
			required: [true, "last name is required"],
			trim: true,
			text: true,
		},
		username: {
			type: String,
			required: [true, "username is required"],
			trim: true,
			text: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "password is required"],
			trim: true,
		},
		picture: {
			type: String,
			trim: true,
			default: "",
		},
		cover: {
			type: String,
			trim: true,
			default: "",
		},
		gender: {
			type: String,
			trim: true,
			required: [true, "gender is required"],
		},
		bYear: {
			type: Number,
			trim: true,
			required: [true, "year is required"],
		},
		bMonth: {
			type: Number,
			trim: true,
			required: [true, "month is required"],
		},
		bDay: {
			type: Number,
			trim: true,
			required: [true, "year is required"],
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
		requests: {
			type: Array,
			default: [],
		},
		searchHistory: [
			{
				user: {
					type: ObjectId,
					ref: "User",
				},
			},
		],

		details: {
			bio: {
				type: String,
			},
			otherName: {
				type: String,
			},
			job: {
				type: String,
			},
			workplace: {
				type: String,
			},
			highSchoole: {
				type: String,
			},
			collage: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			hometown: {
				type: String,
			},
			relationship: {
				type: String,
				enum: ["single", "married", "complicated", "divorced", "widowed"],
			},
			instagram: {
				type: String,
			},
		},
		savedPosts: [
			{
				post: {
					type: ObjectId,
					ref: "Post",
				},
				savedAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
