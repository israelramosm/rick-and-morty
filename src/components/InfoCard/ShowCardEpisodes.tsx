import { Badge } from "flowbite-react";

const ShowCardEpisodes = ({ episodes, className, classText }: { episodes: Array<string>, className?: string, classText?: string }) => (
  <>
    <p className={`font-bold text-gray-700 dark:text-gray-400 ${className} ${classText}`}>Episodes</p>
    <div className="flex flex-wrap gap-2">
      {episodes.map((item, i) => (
        <Badge key={i} color="gray">
          {item}
        </Badge>
      ))}
    </div>
  </>
);

export default ShowCardEpisodes;
