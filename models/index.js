// models/index.js
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
 foreignKey: 'userId',
 as: 'posts',
});

Post.belongsTo(User, {
 foreignKey: 'userId',
 as: 'author',
});

Comment.belongsTo(User, {
 foreignKey: 'userId',
 as: 'author',
});

Comment.belongsTo(Post, {
 foreignKey: 'postId',
 as: 'post',
});

module.exports = { User, Post, Comment };