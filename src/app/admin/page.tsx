'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser, useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { Project, Author } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import ProjectList from '@/components/admin/project-list';
import AuthorForm from '@/components/admin/author-form';
import SettingsForm from '@/components/admin/settings-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  
  const adminRoleDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'roles_admin', user.uid);
  }, [firestore, user]);
  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleDocRef);

  const projectsQuery = useMemoFirebase(() => {
    if (!firestore || !adminRole) return null; // Fetch only if admin
    return collection(firestore, 'projects');
  }, [firestore, adminRole]);
  const { data: projects, isLoading: projectsLoading } = useCollection<Project>(projectsQuery);

  const authorQuery = useMemoFirebase(() => {
      if (!firestore || !adminRole) return null; // Fetch only if admin
      return collection(firestore, 'author');
  }, [firestore, adminRole]);
  const { data: authors, isLoading: authorLoading } = useCollection<Author>(authorQuery);
  const author = authors?.[0];

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (isUserLoading || isAdminLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    // This is handled by the useEffect redirect, but it's a good safeguard.
    return null;
  }

  if (!adminRole) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
            <h1 className="font-headline text-4xl">Acceso Denegado</h1>
            <p className="mt-4 text-lg text-muted-foreground">No tienes permisos de administrador.</p>
            <p className="mt-2 text-sm text-muted-foreground">
                Por favor, sigue las instrucciones para configurar tu rol de administrador en la consola de Firebase.
            </p>
            <Button onClick={handleLogout} variant="outline" className="mt-8">Cerrar Sesión</Button>
        </div>
    );
  }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Panel de Administración</h1>
        <Button onClick={handleLogout} variant="outline">Cerrar Sesión</Button>
      </div>
      
      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="author">Mi Perfil</TabsTrigger>
          <TabsTrigger value="settings">Ajustes Generales</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          {projectsLoading ? (
            <div className="flex justify-center items-center">
                 <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <ProjectList projects={projects || []} />
          )}
        </TabsContent>
        <TabsContent value="author">
          {authorLoading ? (
             <div className="flex justify-center items-center">
                 <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <AuthorForm author={author} />
          )}
        </TabsContent>
        <TabsContent value="settings">
            <SettingsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
