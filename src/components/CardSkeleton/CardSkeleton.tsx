export function CardSkeleton({ withImage }: { withImage?: boolean }) {
  return (
    <div
      className="w-full max-w-xs animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      role="status"
      aria-label="Loading"
    >
      {withImage && (
        <div className="mb-4 h-64 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      )}
      <div className="mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function CardSkeletonGrid({
  count = 8,
  withImage,
}: {
  count?: number;
  withImage?: boolean;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} withImage={withImage} />
      ))}
    </>
  );
}
