import { Badge } from "flowbite-react";
import Link from "next/link";

const ShowCardEpisodes = ({
  episodes,
  className,
  classText,
}: {
  episodes: Array<string>;
  className?: string;
  classText?: string;
}) => (
  <>
    <p className={`font-bold text-gray-700 dark:text-gray-400 ${className} ${classText}`}>Episodes</p>
    <div className="relative z-20 flex max-h-20 flex-wrap gap-2 overflow-y-auto">
      {episodes.map((item, i) => (
        <Link key={i} href={`/episodes/${item}`}>
          <Badge color="gray">{item}</Badge>
        </Link>
      ))}
    </div>
  </>
);

export default ShowCardEpisodes;
