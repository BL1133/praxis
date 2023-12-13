import { Badge } from 'flowbite-react';

export function Tag({
  tag,
  noClick = false,
}: {
  tag: string;
  noClick?: boolean;
}) {
  return (
    <Badge
      color="gray"
      className={`mt-1 checked:bg-cyan-600 hover:text-cyan-600 checked:text-gray-100 ${
        noClick ? '' : 'hover:cursor-pointer'
      }`}
    >
      {tag}
    </Badge>
  );
}
