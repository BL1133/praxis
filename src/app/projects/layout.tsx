import { ProjectFormProvider } from '@/providers/ProjectFormContext';
import { TagsFilterProvider } from '@/providers/TagsFilterContext';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mr-10 ml-10">
      <TagsFilterProvider>
        <ProjectFormProvider>{children}</ProjectFormProvider>
      </TagsFilterProvider>
    </section>
  );
}
