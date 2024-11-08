import { FC, useEffect, useMemo, useState } from 'react';
import CreatePost from '../../components/PostComment/CreatePost';
import { Post } from '../../types/post';
import styles from './Posts.module.css';

interface Props {
  posts: Post[];
}

const Posts: FC<Props> = () => {
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);

  const timeSince = useMemo(() => {
    return (timestamp: string) => {
      const then = new Date(timestamp);
      const now = new Date();
      const seconds = Math.round((now.getTime() - then.getTime()) / 1000);

      const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'h', seconds: 3600 },
        { label: 'm', seconds: 60 },
        { label: 's', seconds: 1 },
      ];

      for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
          return `${count} ${interval.label}`;
        }
      }

      return 'Just now';
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts/posts-w-comments');
        const data = await response.json();
        console.log('Posts:', data);
        setFetchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className={styles.container}>
      <div>
        <h2>Create post</h2>
        <CreatePost />
      </div>
      {fetchedPosts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <div className={styles.post}>
            <div className={styles.postContent}>
              <div className={styles.author}>
                <span>
                  {post.f_name} {post.l_name}
                </span>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postText}>{post.content}</p>
            </div>
            <div className={styles.timeCreated}>
              <span>{timeSince(post.created_at)}</span>
            </div>
          </div>
          {post.comments.map((comment) => (
            <div key={comment.id} className={styles.commentContainer}>
              <div className={styles.comment}>
                <div className={styles.commentBy}>
                  <span>
                    {comment.first_name} {comment.last_name}
                  </span>
                </div>
                <p className={styles.commentText}>{comment.content}</p>
              </div>
              <div className={styles.timeCreated}>
                <span>{timeSince(comment.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Posts;
