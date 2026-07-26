const STATUS_COLORS: Record<string, string> = {
  alive: "bg-green-500",
  dead: "bg-red-500",
  unknown: "bg-gray-400",
};

function capitalize(value: string): string {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.trim().toLowerCase();
  const dotColor = STATUS_COLORS[normalized] ?? STATUS_COLORS.unknown;
  const label = normalized.length > 0 ? capitalize(normalized) : "Unknown";

  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      <span
        className={`h-2.5 w-2.5 rounded-full ${dotColor}`}
        aria-hidden="true"
      />
      <span>
        <span className="sr-only">Status: </span>
        {label}
      </span>
    </span>
  );
}
