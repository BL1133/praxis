import { Badge } from 'flowbite-react';

export function Tag({ tag }: { tag: string }) {
  return (
    <Badge
      color="gray"
      className={`mt-1checked:bg-cyan-600 hover:text-cyan-600 checked:text-gray-100 hover:cursor-pointer`}
    >
      {tag}
    </Badge>
  );
}
