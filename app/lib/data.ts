import {
  Post,
Category
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
    const whereClause: any = {};

    if (type) {
      whereClause.OR = [{ type: type }];
    }

    if (query) {
      whereClause.OR = [{ title: { contains: query, mode: "insensitive" } }];
    }

    const data = await db.post.findMany({
      where: whereClause,
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

export async function fetchAllPages({
  type,
  query,
}: {
  type?: string;
  category?: string;
  query?: string;
}): Promise<number> {
  noStore();
  try {
    const whereClause: any = {};

    if (type) {
      whereClause.OR = [{ type: type }];
    }
    if (query) {
      whereClause.OR = [{ title: { contains: query, mode: "insensitive" } }];
    }

    const data = await db.post.count({
      where: whereClause,
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
