import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

export const ArticleDataSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    body: z.string().min(1, { message: 'Body is required.' }),
    summary: z.string().min(1, { message: 'Summary is required.' }),
    category: z.string().min(1, { message: 'Category is required.' }),
    image: z.any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, `Max file size is 3MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".png are accepted."
    ),
})