'use client';

import { useState } from 'react';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ProjectForm from './project-form';
import { deleteDoc, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    if(!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'projects', projectId));
      toast({
        title: 'Proyecto eliminado',
        description: 'El proyecto ha sido eliminado correctamente.',
      });
    } catch(e) {
        toast({
            variant: "destructive",
            title: 'Error',
            description: 'No se pudo eliminar el proyecto.',
        });
    }
  };

  return (
    <div>
        <div className="flex justify-end mb-4">
             <Button onClick={handleAddNew}>Añadir Nuevo Proyecto</Button>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent className="sm:max-w-[600px] overflow-y-auto">
                <SheetHeader>
                <SheetTitle>{editingProject ? 'Editar Proyecto' : 'Añadir Nuevo Proyecto'}</SheetTitle>
                </SheetHeader>
                <ProjectForm project={editingProject} onFinished={() => setIsSheetOpen(false)} />
            </SheetContent>
        </Sheet>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Año</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.year}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(project)}>Editar</Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Eliminar</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará permanentemente el proyecto.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(project.id)}>Eliminar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
