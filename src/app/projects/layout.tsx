import { ProjectFormProvider } from '@/providers/ProjectFormContext';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProjectFormProvider>{children}</ProjectFormProvider>
    </section>
  );
}
