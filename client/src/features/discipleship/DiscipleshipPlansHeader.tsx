export type PlansFilter = "all" | "started" | "completed";

interface DiscipleshipPlansHeaderProps {
  activeFilter: PlansFilter;
  onChangeFilter: (filter: PlansFilter) => void;
  counts?: {
    all?: number;
    started?: number;
    completed?: number;
  };
}

export function DiscipleshipPlansHeader({
  activeFilter,
  onChangeFilter,
  counts,
}: DiscipleshipPlansHeaderProps) {
  const baseButton =
    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors";
  const activeClasses =
    "bg-primary text-primary-foreground border-primary shadow-sm";
  const inactiveClasses =
    "bg-card text-foreground border-border hover-elevate";

  const pill = (filter: PlansFilter, label: string, count?: number) => {
    const isActive = activeFilter === filter;
    return (
      <button
        key={filter}
        type="button"
        onClick={() => onChangeFilter(filter)}
        className={`${baseButton} ${isActive ? activeClasses : inactiveClasses}`}
        data-testid={`filter-${filter}`}
      >
        <span>{label}</span>
        {typeof count === "number" && (
          <span className="ml-1 text-[10px] opacity-75">
            ({count})
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold">
          Discipleship Plans
        </h1>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {pill("all", "All Plans", counts?.all)}
        {pill("started", "Started Plans", counts?.started)}
        {pill("completed", "Completed Plans", counts?.completed)}
      </div>
    </div>
  );
}
