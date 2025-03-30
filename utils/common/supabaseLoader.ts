import { ImageLoaderProps } from 'next/image';

export function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  const baseUrl = 'https://ltiumfqgtagnorsdlwws.supabase.co/storage/v1/render/image/sign';

  const isSignedUrl = src.includes('token=');
  const imageUrl = isSignedUrl ? src : `${baseUrl}${src}`;

  const url = new URL(imageUrl);
  url.searchParams.set('width', width.toString());
  url.searchParams.set('quality', (quality || 10).toString());

  return url.href;
}
