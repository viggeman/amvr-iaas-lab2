import { FC, useEffect, useState } from 'react';
import { Post } from '../../types/post';
import styles from './Posts.module.css';

interface Props {
  posts: Post[];
}

const Posts: FC<Props> = () => {
  const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);

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
      <h2>Posts</h2>

      {fetchedPosts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
              <p>
                {comment.first_name} {comment.last_name}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Posts;
