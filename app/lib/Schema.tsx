import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;

export const FormDataSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    body: z.string().min(1, { message: 'Body is required.' }),
    summary: z.string().min(1, { message: 'Summary is required.' }),
    category: z.string().min(1, { message: 'Category is required.' }),
    image: z.any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, `Max file size is 3MB.`)
})

export const EditDataSchema = FormDataSchema.omit({ image: true }).extend({
  image: z.any()
})

export const LoginDataSchema = z.object({
  email: z.string().email({message: 'Invalid email.'}),
  password: z.string().min(6),
})