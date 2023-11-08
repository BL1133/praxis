import { TextInput } from 'flowbite-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

import { useProjectFormContext } from '@/providers/ProjectFormContext';

interface LinksProps {
  register: UseFormRegister<ProjectInputs>;
  errors: FieldErrors<ProjectInputs>;
}

export function LinksSection({ register, errors }: LinksProps) {
  const { loading, success } = useProjectFormContext();
  return (
    <div>
      <div className="flex gap-2">
        <label
          htmlFor="links"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >
          Links
        </label>
        <span className="text-xs pt-1 text-gray-500">(optional)</span>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div>
          <TextInput
            type="text"
            sizing="sm"
            helperText={
              <>{errors?.links?.[0]?.url && errors?.links?.[0]?.url?.message}</>
            }
            color={errors?.links && 'failure'}
            id="link1"
            disabled={loading || success ? true : false}
            placeholder="Add a link starting with 'http...'"
            {...register('links[0].link' as keyof ProjectInputs, {
              // eslint-disable-next-line
              validate: (value: any) => {
                if (!value) return true;
                return (
                  /^(http|https):\/\/[^ "]+$/.test(value) ||
                  "Invalid URL. It must start with 'http' or 'https'."
                );
              },
            })}
          />
        </div>
        <div>
          <TextInput
            type="text"
            sizing="sm"
            helperText={
              <>{errors?.links?.[1]?.url && errors?.links?.[1]?.url.message}</>
            }
            color={errors?.links && 'failure'}
            id="link2"
            disabled={loading || success ? true : false}
            placeholder="Add a link starting with 'http...'"
            {...register('links[1].link' as keyof ProjectInputs, {
              // eslint-disable-next-line
              validate: (value: any) => {
                if (!value) return true;
                return (
                  /^(http|https):\/\/[^ "]+$/.test(value) ||
                  "Invalid URL. It must start with 'http' or 'https'."
                );
              },
            })}
          />
        </div>
        <div>
          <TextInput
            type="text"
            sizing="sm"
            helperText={
              <>{errors?.links?.[2]?.url && errors?.links?.[2]?.url.message}</>
            }
            color={errors?.links && 'failure'}
            id="link3"
            disabled={loading || success ? true : false}
            placeholder="Add a link starting with 'http...'"
            {...register('links[2].link' as keyof ProjectInputs, {
              // eslint-disable-next-line
              validate: (value: any) => {
                if (!value) return true;
                return (
                  /^(http|https):\/\/[^ "]+$/.test(value) ||
                  "Invalid URL. It must start with 'http' or 'https'."
                );
              },
            })}
          />
        </div>
      </div>
    </div>
  );
}
