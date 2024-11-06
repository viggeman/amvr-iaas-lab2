const db = require('../utils');

exports.getAllPosts = async (req, res) => {
  try {
    const postsResult = await db.query('SELECT * FROM post');
    return res.status(200).json(postsResult.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching data');
  }
};

exports.getAllPostsWithComments = async (req, res) => {
  try {
    // 1. Fetch all posts
    const postsResult = await db.query(`
      SELECT
        p.*,
        au.id AS author_id,
        au.first_name AS f_name,
        au.last_name AS l_name
      FROM post p
      JOIN app_user au ON p.app_user_id = au.id
    `);

    const posts = postsResult.rows;
    console.log('posts', posts);

    // 2. Fetch comments for all posts
    const commentsResult = await db.query(`
      SELECT
        c.id,
        c.content,
        c.created_at,
        au.id,
        au.first_name,
        au.last_name,
        c.post_id
      FROM comment c
      JOIN app_user au ON c.app_user_id = au.id
    `);

    const comments = commentsResult.rows;

    // 3. Group comments by post_id
    const commentsByPostId = {};
    comments.forEach((comment) => {
      if (!commentsByPostId[comment.post_id]) {
        commentsByPostId[comment.post_id] = [];
      }
      commentsByPostId[comment.post_id].push(comment);
    });

    // 4. Combine posts and comments
    const response = posts.map((post) => ({
      ...post,
      comments: commentsByPostId[post.id] || [],
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts and comments' });
  }
};

exports.getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    // 1. Fetch the post data
    const postResult = await db.query(
      `
      SELECT
        p.id AS post_id,
        p.title AS post_title,
        p.content AS post_content,
        p.created_at AS post_created_at,
        au.id AS author_id,
        au.first_name AS author_first_name,
        au.last_name AS author_last_name
      FROM post p
      JOIN app_user au ON p.app_user_id = au.id
      WHERE p.id = $1
    `,
      [postId]
    );

    const post = postResult.rows[0];
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // 2. Fetch the comments for the post
    const commentsResult = await db.query(
      `
      SELECT
        c.id AS comment_id,
        c.content AS comment_content,
        c.created_at AS comment_created_at,
        au.id AS commenter_id,
        au.first_name AS commenter_first_name,
        au.last_name AS commenter_last_name
      FROM comment c
      JOIN app_user au ON c.app_user_id = au.id
      WHERE c.post_id = $1
    `,
      [postId]
    );

    const comments = commentsResult.rows;

    // 3. Combine the post and comments
    const response = {
      ...post,
      comments,
    };

    res.status(200).res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch post and comments' });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Fetch posts created by the user
    const postsResult = await db.query(
      `
      SELECT
        p.id AS post_id,
        p.title AS post_title,
        p.content AS post_content,
        p.created_at AS post_created_at,
        au.id AS author_id,
        au.first_name AS author_first_name,
        au.last_name AS author_last_name
      FROM post p
      JOIN app_user au ON p.app_user_id = au.id
      WHERE p.app_user_id = $1
    `,
      [userId]
    );

    const posts = postsResult.rows;

    // 2. Fetch comments for these posts
    const postIds = posts.map((post) => post.post_id);
    const commentsResult = await db.query(
      `
      SELECT
        c.id AS comment_id,
        c.content AS comment_content,
        c.created_at AS comment_created_at,
        au.id AS commenter_id,
        au.first_name AS commenter_first_name,
        au.last_name AS commenter_last_name,
        c.post_id
      FROM comment c
      JOIN app_user au ON c.app_user_id = au.id
      WHERE c.post_id = ANY($1)
    `,
      [postIds]
    );

    const comments = commentsResult.rows;

    // 3. Group comments by post_id
    const commentsByPostId = {};
    comments.forEach((comment) => {
      if (!commentsByPostId[comment.post_id]) {
        commentsByPostId[comment.post_id] = [];
      }
      commentsByPostId[comment.post_id].push(comment);
    });

    // 4. Combine posts and comments
    const response = posts.map((post) => ({
      ...post,
      comments: commentsByPostId[post.post_id] || [],
    }));

    res.status(200).res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts and comments' });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  console.log('postId', postId);

  try {
    await db.query('BEGIN');

    // Delete comments for the post
    await db.query(
      `
        DELETE FROM comment
        WHERE post_id = $1
      `,
      [postId]
    );

    // Delete the post
    await db.query(
      `
        DELETE FROM post
        WHERE id = $1
      `,
      [postId]
    );

    await db.query('COMMIT');

    res.status(204).send(`post and comments för id: ${postId} deleted`);
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};
