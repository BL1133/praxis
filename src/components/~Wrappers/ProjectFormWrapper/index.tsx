import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Inputs } from 'types';

import BadStatusPage from '@/components/BadStatusPage';
import { Loading } from '@/components/LoadingPage';
import { useUser } from '@/lib/hooks/useUser';

const defaultInputValues: Partial<Inputs> = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  skillsWanted: [],
  tags: [],
  links: [],
};

interface ProjectFormWrapperProps {
  defaultValues?: Partial<Inputs>;
  onSubmit: (data: Inputs) => void;
  children: React.ReactNode;
}

export function ProjectFormWrapper({
  defaultValues = defaultInputValues,
  onSubmit,
  children,
}: ProjectFormWrapperProps) {
  const {
    title = '',
    fullDescription = '',
    shortDescription = '',
    skillsWanted = [],
    links = [],
    tags = [],
  } = defaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title,
      fullDescription,
      shortDescription,
      skillsWanted,
      links,
      tags,
    },
  });

  const router = useRouter();
  const { data: userData, isLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !userData?.user ? (
        <BadStatusPage statusCode={403} />
      ) : (
        <section className="bg-white dark:bg-ray-900">{children}</section>
      )}
    </>
  );
}
