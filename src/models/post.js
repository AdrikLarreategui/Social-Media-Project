const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    // commentNumber: {
    //     type: Number,
    //     required: true,
    // },
    body: {
        type: String,
        required:true,
    },
    tokens: [],
}, {timestamps: true})

PostSchema.index({
    name:"text",
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post

// name: {
//     type: String,
//     required: true,
//     },
// email: {
//     type: String,
//     required: true,
//     },
// passwword: {
//     type: String,
//     required: true,
//     },
// 