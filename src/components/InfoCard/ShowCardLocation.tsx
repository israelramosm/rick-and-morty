import Link from "next/link";

const ShowCardLocation = ({
  location,
  locationId,
  className,
  classText,
}: {
  location: string;
  locationId?: string;
  className?: string;
  classText?: string;
}) => (
  <div className={`relative z-20 flex flex-wrap gap-2 ${className}`}>
    <p className={`font-bold text-gray-700 dark:text-gray-400 ${classText}`}>
      Last location:
    </p>
    {locationId ? (
      <Link
        href={`/locations/${locationId}`}
        className={`font-normal text-gray-700 underline dark:text-gray-400 ${classText}`}
      >
        {location}
      </Link>
    ) : (
      <p className={`font-normal text-gray-700 dark:text-gray-400 ${classText}`}>{location}</p>
    )}
  </div>
);

export default ShowCardLocation;
