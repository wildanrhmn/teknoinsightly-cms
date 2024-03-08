import {
  Post,
  Category,
  Swiper,
  PopularList,
} from './definitions';

import { formatDate } from './utils';
import { db } from './prisma/db.server';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchPostsByType(
  type: string,
  currentPage: number = 1,
  query?: string
): Promise<Post[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await db.post.findMany({
      where: {
        AND: {
          type: type,
          title: { contains: query, mode: "insensitive" },
        }
      },
      include: {
        Category: {
          select: {
            slug: true,
          },
        },
        Author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    const formattedData = data.map((post: any) => {
      return {
        ...post,
        created_at: formatDate(post.created_at),
        updated_at: formatDate(post.updated_at),
      };
    });
    return formattedData;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchAllPostPages({
  type,
  query,
}: {
  type?: string;
  category?: string;
  query?: string;
}): Promise<number> {
  noStore();
  try {
    const data = await db.post.count({
      where: {
        AND: {
          type: type,
          title: { contains: query, mode: "insensitive" },
        }
      },
    });

    const totalPages = Math.ceil(Number(data) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchPostById(id: string): Promise<Post> {
  try {
    const data = await db.post.findUnique({
      where: {
        id: id,
      },
      include: {
       Category: true,
      },
    });

    if (!data) {
      throw new Error("Post not found");
    }
    
    return { ...data, created_at: formatDate(data.created_at), updated_at: formatDate(data.updated_at) };
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchSwiperData(
  currentPage: number = 1,
  query?: string
): Promise<Swiper[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await db.swiper.findMany({
      where: {
        Post: {
          title: { contains: query, mode: "insensitive" },
        },
      },
      include: { Post: {
        include: { Author: true, Category: true },
      } },
      orderBy: {
        Post: {
          created_at: "desc",
        }
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    const formattedData = data.map((post: any) => {
      return {
        ...post,
        created_at: formatDate(post.Post.created_at),
        updated_at: formatDate(post.Post.updated_at)
      };
    });

    return formattedData;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchSwiperPages({
  query,
}: {
  query?: string;
}): Promise<number> {
  noStore();
  try {
    const data = await db.swiper.count({
      where: {
        Post: {
          title: { contains: query, mode: "insensitive" },
        }
      },
    });

    const totalPages = Math.ceil(Number(data) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchCategories({
  type
}: {
  type: string
}): Promise<Category[]> {
  noStore();
  try {
    const data = await db.category.findMany({
      where: {
        type: type
      }
    });
    return data;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchTopContentData(
  currentPage: number = 1,
  type: string,
  query?: string,
): Promise<PopularList[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await db.popularPost.findMany({
      where: {
        AND: {
          Post: { type: type, title: { contains: query, mode: "insensitive" }},  
        }
      },
      include: { Post: {
        include: { Author: true, Category: true },
      } },
      orderBy: {
        Post: {
          created_at: "desc",
        }
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    const formattedData = data.map((post: any) => {
      return {
        ...post,
        created_at: formatDate(post.Post.created_at),
        updated_at: formatDate(post.Post.updated_at)
      };
    });

    return formattedData;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}

export async function fetchTopContentPages({
  query,
  type
}: {
  query?: string;
  type: string
}): Promise<number> {
  noStore();
  try {
    const data = await db.popularPost.count({
      where: {
        AND: {
          Post: { type: type, title: { contains: query, mode: "insensitive" }},  
        }
      },
    });

    const totalPages = Math.ceil(Number(data) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log("Database Error: ", error);
    throw new Error("Database Error");
  }
}
