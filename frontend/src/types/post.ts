export interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  f_name: string;
  l_name: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  commenter_id: string;
  first_name: string;
  last_name: string;
  post_id: string;
}
