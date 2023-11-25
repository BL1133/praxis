import { ProjectFormProvider } from '@/providers/ProjectFormContext';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mr-10 ml-10">
      <ProjectFormProvider>{children}</ProjectFormProvider>
    </section>
  );
}
