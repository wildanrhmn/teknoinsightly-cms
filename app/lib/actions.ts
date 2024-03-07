'use server'

import cloudinary from './cloudinary';

import { db } from './prisma/db.server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export async function authenticate(loginData: { email: string; password: string }) {
  try {
    await signIn('credentials', loginData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Invalid credentials.' };
        default:
          return { success: false, message: 'Unknown error.' };
      }
    }
  }
  return { success: true, message: 'Successfully logged in.' };
}

async function uploadImage(data: File) {
  const arrayBuffer = await data.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'teknoinsight/articles' }, function (error, result) {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    })
      .end(buffer);
  });
}

export async function createPost(formData: FormData) {
  const session = await auth();

  const id_author = session?.user?.id;
  
  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const summary = formData.get('summary') as string;
  const type = formData.get('type') as string;
  const category = formData.get('category') as string;

  try {
    const imageUpload: any = await uploadImage(file);
    await db.post.create({
      data: {
        title: title,
        body: body,
        summary: summary,
        id_category: category,
        image: [imageUpload?.public_id, imageUpload?.secure_url],
        id_author: id_author,
        type: type,
      },
    })
  } catch (error) {
    return { success: false, message: error }
  }
  revalidatePath('/dashboard/articles');
  revalidatePath('/dashboard/articles/create');
  revalidatePath('/dashboard/tutorial');
  revalidatePath('/dashboard/tutorial/create');
  return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} Created` }
}

// export async function UpdateContent(id: string, prevState: State, formData: FormData){
//     const validatedFields = Update.safeParse({
//         customerId: formData.get('customerId'),
//         amount: formData.get('amount'),
//         status: formData.get('status'),
//       });

//       if (!validatedFields.success) {
//         return {
//           errors: validatedFields.error.flatten().fieldErrors,
//           message: 'Missing Fields. Failed to Update Invoice.',
//         };
//       }

//       const { customerId, amount, status } = validatedFields.data;

//       const amountInCents = amount * 100;

//       try{
//         await db.post.update({
//           where: {
//             id: id
//           },
//           data: {
//             customer_id: customerId,
//             amount: amountInCents,
//             status: status
//           }
//         })
//       } catch(error){
//         return{
//           message: 'Database Error: ' + error
//         }
//       }

//       revalidatePath('/dashboard/invoices');
//       redirect('/dashboard/invoices');
// }

export async function DeletePost(id: string, public_id: string) {
  try {
    cloudinary.uploader.destroy(public_id).then((result: any) => { });
    await db.post.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    return {
      message: 'Database Error: ' + error
    }
  }
  revalidatePath('/dashboard/articles');
  revalidatePath('/dashboard/tutorial');
}