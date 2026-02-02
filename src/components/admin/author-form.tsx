'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Author } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore, useStorage } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';

const authorSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio.'),
  title: z.string().min(1, 'El título es obligatorio.'),
  bio: z.string().min(1, 'La biografía es obligatoria.'),
  imageUrl: z.string().url('La URL de la imagen no es válida.').or(z.any()),
});

type AuthorFormValues = z.infer<typeof authorSchema>;

interface AuthorFormProps {
  author?: Author | null;
}

export default function AuthorForm({ author }: AuthorFormProps) {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<AuthorFormValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: author ? { ...author } : {
      name: 'Pablo Blázquez Gil',
      title: 'Un Narrador Detrás del Lente',
      bio: `Mi nombre es Pablo Blázquez Gil. Con una pasión por la narrativa visual, he pasado más de una década perfeccionando mi arte, transformando momentos fugaces en historias atemporales. Mi trabajo es una mezcla de arte cinematográfico y emoción auténtica, buscando la belleza tanto en lo grandioso como en lo sutil.\n\nDesde campañas comerciales hasta proyectos personales, abordo cada fotograma con intención y el deseo de conectar con el espectador a un nivel más profundo. Creemos algo inolvidable juntos.`,
      imageUrl: '',
    },
  });

  const handleFileUpload = async (file: File) => {
    if (!file || !storage) return;

    const storageRef = ref(storage, `author/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast({ variant: 'destructive', title: 'Error de subida', description: 'No se pudo subir el archivo.' });
          setIsLoading(false);
          setUploadProgress(0);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setValue('imageUrl', downloadURL);
          setUploadProgress(100);
          resolve(downloadURL);
        }
      );
    });
  };

  const onSubmit = async (data: AuthorFormValues) => {
    if (!firestore) return;
    setIsLoading(true);
    setUploadProgress(0);

    try {
      let imageUrl = data.imageUrl;
      if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
        imageUrl = await handleFileUpload(data.imageUrl[0]);
      }

      const authorData = { ...data, imageUrl };

      const docId = author?.id || 'main-author'; 
      const docRef = doc(firestore, 'author', docId);
      await setDoc(docRef, authorData, { merge: true });

      toast({
        title: 'Perfil actualizado',
        description: 'Tu información de perfil ha sido guardada.',
      });
    } catch (error) {
      console.error("Error saving author data:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el perfil.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título Profesional</Label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Biografía</Label>
        <Textarea id="bio" {...register('bio')} rows={8} />
        {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Foto de Perfil</Label>
        <Input id="imageUrl" type="file" {...register('imageUrl')} />
        {uploadProgress > 0 && uploadProgress < 100 && <Progress value={uploadProgress} className="w-full mt-2" />}
        {typeof author?.imageUrl === 'string' && author.imageUrl && <img src={author.imageUrl} alt="preview" className="mt-4 h-32 w-32 rounded-full object-cover" />}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Guardar Cambios'}
        </Button>
      </div>
    </form>
  );
}
