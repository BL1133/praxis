import { Checkbox, Label } from 'flowbite-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ProjectInputs } from 'types';

interface SkillsWantedProps {
  register: UseFormRegister<ProjectInputs>;
  errors: FieldErrors<ProjectInputs>;
}

export function SkillsWanted({ register, errors }: SkillsWantedProps) {
  // Register the skillsWanted group with validation
  // This is so that validate isn't run on every checkbox
  // Because checboxes all have same name, they are grouped
  // So validate runs once on entire group, which is an array
  const skillsWantedRef = register('skillsWanted', {
    validate: (value) => value.length > 0 || '*At least one skill is required',
  });

  return (
    <div className="flex max-w-md flex-col gap-4" id="skills">
      <div className="flex gap-2">
        <label
          htmlFor="skills"
          className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
        >
          Skills Wanted:
        </label>
        <span className="text-xs pt-1 text-gray-500">(Choose at least 1)</span>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="developer"
          className="hover:cursor-pointer"
          value="developer"
          {...skillsWantedRef}
        />
        <Label className="flex" htmlFor="developer">
          Developer
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="designer"
          className="hover:cursor-pointer"
          value="designer"
          {...skillsWantedRef}
        />
        <Label htmlFor="designer">Designer</Label>
      </div>
      <div className="flex gap-2">
        <div className="flex h-5 items-center">
          <Checkbox
            id="mentor"
            className="hover:cursor-pointer"
            value="mentor"
            {...skillsWantedRef}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="mentor">Mentor</Label>
          <div className="text-gray-500 dark:text-gray-300">
            <span className="text-xs font-normal">
              <p>Find a mentor to help guide you with your project.</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex h-5 items-center">
          <Checkbox
            id="maintainer"
            className="hover:cursor-pointer"
            value="maintainer"
            {...skillsWantedRef}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="maintainer">Maintainer</Label>
          <div className="text-gray-500 dark:text-gray-300">
            <span className="text-xs font-normal">
              <p>Maintainers have the ability to manage the project.</p>
            </span>
          </div>
        </div>
      </div>
      {errors?.skillsWanted && (
        <span className="text-orange-600 mt-1 text-sm">
          {errors?.skillsWanted?.message}
        </span>
      )}
    </div>
  );
}
