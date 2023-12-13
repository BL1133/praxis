import { ProjectFormProvider } from '@/providers/ProjectFormContext';
import { TagsFilterProvider } from '@/providers/TagsFilterContext';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="lg:mx-10 mx-4">
      <TagsFilterProvider>
        <ProjectFormProvider>{children}</ProjectFormProvider>
      </TagsFilterProvider>
    </section>
  );
}
