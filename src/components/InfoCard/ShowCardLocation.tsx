const ShowCardLocation = ({
  location,
  className,
  classText
}: {
  location: string;
  className?: string;
  classText?: string;
}) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    <p className={`font-bold text-gray-700 dark:text-gray-400 ${classText}`}>
      Last location:
    </p>
    <p className={`font-normal text-gray-700 dark:text-gray-400 ${classText}`}>{location}</p>
  </div>
);

export default ShowCardLocation;
