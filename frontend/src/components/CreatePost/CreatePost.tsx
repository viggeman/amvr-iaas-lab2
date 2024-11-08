import { FC, useState } from 'react';
import { PostData } from '../../types/post';
import styles from './CreatePost.module.css';

interface Props {
  onPostCreated: (newPost: string) => void;
}

const CreatePost: FC<Props> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [appUserId, setAppUserId] = useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const newPost: PostData = {
      title,
      content,
      app_user_id: appUserId,
    };
    console.log('body', newPost);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log('Post created successfully!');
        const newPost: string = await response.json();
        console.log('newpost', newPost);
        onPostCreated(newPost);
        setTitle('');
        setAppUserId('');
        setContent('');
      } else {
        const errorData = await response.json();
        console.error('Error creating post:', errorData);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Title</h3>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Content</h3>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>User ID</h3>
          <input
            type="text"
            id="appUserId"
            value={appUserId}
            onChange={(e) => setAppUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
