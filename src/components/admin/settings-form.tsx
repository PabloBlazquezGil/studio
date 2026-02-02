'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { SiteSettings } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFirestore, useStorage, useDoc, useMemoFirebase } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';

const settingsSchema = z.object({
  heroVideoUrl: z.string().url('La URL del vídeo no es válida.').or(z.any()),
  heroPosterUrl: z.string().url('La URL del póster no es válida.').or(z.any()),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsForm() {
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  
  const settingsDocRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'site_settings', 'main');
  }, [firestore]);
  const { data: settings, isLoading: settingsLoading } = useDoc<SiteSettings>(settingsDocRef);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
        heroVideoUrl: '',
        heroPosterUrl: '',
    },
  });

  useEffect(() => {
    if (settings) {
        reset(settings);
    }
  }, [settings, reset]);

  const handleFileUpload = async (file: File, fieldName: 'heroVideoUrl' | 'heroPosterUrl') => {
    if (!file || !storage) return;
    
    const storageRef = ref(storage, `settings/${fieldName}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(prev => ({ ...prev, [fieldName]: progress }));
            },
            (error) => {
                console.error("Upload failed:", error);
                toast({ variant: 'destructive', title: 'Error de subida', description: 'No se pudo subir el archivo.'});
                setIsLoading(false);
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setValue(fieldName, downloadURL);
                resolve(downloadURL);
            }
        );
    });
  };

  const onSubmit = async (data: SettingsFormValues) => {
    if (!firestore) return;
    setIsLoading(true);

    try {
        let { heroVideoUrl, heroPosterUrl } = data;

        if (data.heroVideoUrl instanceof FileList && data.heroVideoUrl.length > 0) {
            heroVideoUrl = await handleFileUpload(data.heroVideoUrl[0], 'heroVideoUrl');
        }
        if (data.heroPosterUrl instanceof FileList && data.heroPosterUrl.length > 0) {
            heroPosterUrl = await handleFileUpload(data.heroPosterUrl[0], 'heroPosterUrl');
        }

        const settingsData = { heroVideoUrl, heroPosterUrl };

        await setDoc(doc(firestore, 'site_settings', 'main'), settingsData, { merge: true });

        toast({
            title: 'Ajustes guardados',
            description: `Los ajustes generales del sitio han sido actualizados.`,
        });
    } catch (error) {
        console.error("Error saving settings:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron guardar los ajustes.' });
    } finally {
        setIsLoading(false);
    }
  };
  
  if (settingsLoading) {
      return (
          <div className="flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="heroVideoUrl">Vídeo de Cabecera</Label>
        <Input id="heroVideoUrl" type="file" {...register('heroVideoUrl')} />
        {uploadProgress['heroVideoUrl'] > 0 && uploadProgress['heroVideoUrl'] < 100 && <Progress value={uploadProgress['heroVideoUrl']} className="w-full mt-2" />}
        {typeof settings?.heroVideoUrl === 'string' && settings.heroVideoUrl && <video src={settings.heroVideoUrl} className="mt-2 h-48 w-auto rounded-md" controls />}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="heroPosterUrl">Póster del Vídeo de Cabecera (imagen de carga)</Label>
        <Input id="heroPosterUrl" type="file" {...register('heroPosterUrl')} />
        {uploadProgress['heroPosterUrl'] > 0 && uploadProgress['heroPosterUrl'] < 100 && <Progress value={uploadProgress['heroPosterUrl']} className="w-full mt-2" />}
        {typeof settings?.heroPosterUrl === 'string' && settings.heroPosterUrl && <img src={settings.heroPosterUrl} alt="preview" className="mt-2 h-24 w-auto rounded-md" />}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Guardar Ajustes'}
        </Button>
      </div>
    </form>
  );
}
