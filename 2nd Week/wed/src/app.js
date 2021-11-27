const express = require('express');

const app = express();
app.use(express.json());

const connect = require('./configs/db');

const postsController = require('./controller/post.controller');
const tagsController = require('./controller/tag.controller');
const usersController = require('./controller/user.controller');
const commentController = require('./controller/comment.controller');

app.use('/posts',postsController);
app.use('/comments',commentController);
app.use('/tags',tagsController);
app.use('/user',usersController);



app.listen(2345, async () => {
 await connect();
 console.log('server is listeing');
});
