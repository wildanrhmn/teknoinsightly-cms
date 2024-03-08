export type Post = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  image: string[];
  type: string;
  body: string;
  id_category: string;
  id_author: string;
  summary: string;
  swiperId: string | null;
  popularId: string | null;
  Category: Category;
  Author?: User;
};

export type Swiper = {
  id: string;
  created_at: string;
  updated_at: string;
  Post: Post;
}

export type PopularList = {
  id: string;
  created_at: string;
  updated_at: string;
  Post: Post;
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
  website: string | null;
  message: string;
};

export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  bio: string;
  role: string;
  image: string | null;
}
