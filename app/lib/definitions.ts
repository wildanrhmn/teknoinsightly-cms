export type Post = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  id_category: string;
  category: {
    slug: string;
  };
  id_author: string;
  Author: {
    name: string;
  };
  body: string;
  type: string;
  image: string;
  summary: string;
};

export type PopularList = {
  id: string;
  title: string;
  id_author: string;
  created_at: string;
  author: {
    name: string;
  };
  image: string;
  type: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  type: string;
};

export type Comment = {
  id: string;
  id_post: string;
  created_at: string;
  name: string;
  email: string;
  website?: string;
  message: string;
};

export type User = {
  id?: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  image: string | null;
}
