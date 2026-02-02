'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore, useStorage } from '@/firebase';
import { setDoc, doc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Progress } from '../ui/progress';

const projectSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio.'),
  category: z.string().min(1, 'La categoría es obligatoria.'),
  year: z.coerce.number().min(2000, 'El año debe ser válido.'),
  client: z.string().min(1, 'El cliente es obligatorio.'),
  description: z.string().min(1, 'La descripción es obligatoria.'),
  imageUrl: z.string().url('La URL de la imagen no es válida.').or(z.any()),
  media: z.array(z.object({
    type: z.enum(['image', 'video']),
    url: z.string().url('La URL del medio no es válida.').or(z.any()),
  })),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project | null;
  onFinished: () => void;
}

export default function ProjectForm({ project, onFinished }: ProjectFormProps) {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
        ...project,
    } : {
      title: '',
      category: '',
      year: new Date().getFullYear(),
      client: '',
      description: '',
      imageUrl: '',
      media: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const handleFileUpload = async (file: File, fieldName: string, index?: number) => {
    if (!file || !storage) return;
    const uniqueId = fieldName + (index !== undefined ? `-${index}` : '');
    
    const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(prev => ({ ...prev, [uniqueId]: progress }));
            },
            (error) => {
                console.error("Upload failed:", error);
                toast({ variant: 'destructive', title: 'Error de subida', description: 'No se pudo subir el archivo.'});
                setIsLoading(false);
                setUploadProgress(prev => ({ ...prev, [uniqueId]: 0 }));
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                if (fieldName === 'imageUrl') {
                    setValue('imageUrl', downloadURL);
                } else if (index !== undefined) {
                    setValue(`media.${index}.url`, downloadURL);
                }
                setUploadProgress(prev => ({ ...prev, [uniqueId]: 100 }));
                resolve(downloadURL);
            }
        );
    });
  };

  const onSubmit = async (data: ProjectFormValues) => {
    if (!firestore) return;
    setIsLoading(true);

    try {
        let imageUrl = data.imageUrl;
        if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
            imageUrl = await handleFileUpload(data.imageUrl[0], 'imageUrl');
        }

        const mediaUrls = await Promise.all(data.media.map(async (mediaItem, index) => {
            if (mediaItem.url instanceof FileList && mediaItem.url.length > 0) {
                const url = await handleFileUpload(mediaItem.url[0], `media`, index);
                return { type: mediaItem.type, url };
            }
            return mediaItem;
        }));

        const projectData = {
            ...data,
            imageUrl,
            media: mediaUrls,
        };

        const docRef = project ? doc(firestore, 'projects', project.id) : doc(collection(firestore, 'projects'));
        await setDoc(docRef, projectData, { merge: true });

        toast({
            title: `Proyecto ${project ? 'actualizado' : 'creado'}`,
            description: `El proyecto "${data.title}" ha sido guardado.`,
        });
        onFinished();
    } catch (error) {
        console.error("Error saving project:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo guardar el proyecto.' });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register('title')} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

        <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Input id="category" {...register('category')} />
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input id="year" type="number" {...register('year')} />
                {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Input id="client" {...register('client')} />
                {errors.client && <p className="text-sm text-destructive">{errors.client.message}</p>}
            </div>
        </div>
         <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" {...register('description')} />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
        </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Imagen Principal (para la galería)</Label>
        <Input id="imageUrl" type="file" {...register('imageUrl')} />
        {uploadProgress['imageUrl'] > 0 && uploadProgress['imageUrl'] < 100 && <Progress value={uploadProgress['imageUrl']} className="w-full mt-2" />}
        {typeof project?.imageUrl === 'string' && project.imageUrl && <img src={project.imageUrl} alt="preview" className="mt-2 h-24 w-auto rounded-md" />}
      </div>

      <div className="space-y-4">
          <Label>Galería de Medios (para la vista de detalle)</Label>
          {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-4 p-4 border rounded-md">
                  <div className='flex-grow space-y-2'>
                    <Label>Tipo</Label>
                    <select {...register(`media.${index}.type`)} className='w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm'>
                        <option value="image">Imagen</option>
                        <option value="video">Vídeo</option>
                    </select>
                    <Label>Archivo</Label>
                    <Input type="file" {...register(`media.${index}.url`)} />
                    {uploadProgress[`media-${index}`] > 0 && uploadProgress[`media-${index}`] < 100 && <Progress value={uploadProgress[`media-${index}`]} className="w-full mt-2" />}
                    {typeof field.url === 'string' && field.url && (
                        field.type === 'image' ? <img src={field.url} alt="preview" className="mt-2 h-24 w-auto rounded-md" /> : <video src={field.url} className="mt-2 h-24 w-auto rounded-md" controls/>
                    )}
                  </div>
                  <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                  </Button>
              </div>
          ))}
          <Button type="button" variant="outline" onClick={() => append({ type: 'image', url: '' })}>
              Añadir Medio
          </Button>
      </div>


      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onFinished}>Cancelar</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}
