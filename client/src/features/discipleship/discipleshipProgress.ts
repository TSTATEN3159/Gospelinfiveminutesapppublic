import { DiscipleshipPlan } from "./discipleshipPlans";

const PROGRESS_PREFIX = "discipleship-progress:";

export type PlanProgress = {
  completedItemIds: string[];
};

function getStorageKey(planId: string) {
  return `${PROGRESS_PREFIX}${planId}`;
}

export function loadPlanProgress(plan: DiscipleshipPlan): {
  completed: number;
  total: number;
  ratio: number;
  completedItemIds: string[];
} {
  const key = getStorageKey(plan.id);
  let stored: PlanProgress | null = null;

  try {
    const raw = localStorage.getItem(key);
    if (raw) stored = JSON.parse(raw);
  } catch {
    stored = null;
  }

  const completedIds = stored?.completedItemIds ?? [];
  const allItemIds = plan.days.flatMap((d) => d.items.map((i) => i.id));

  const completed = allItemIds.filter((id) => completedIds.includes(id)).length;
  const total = allItemIds.length;
  const ratio = total === 0 ? 0 : completed / total;

  return { completed, total, ratio, completedItemIds: completedIds };
}

export function markItemCompleted(plan: DiscipleshipPlan, itemId: string) {
  const key = getStorageKey(plan.id);
  const current = loadPlanProgress(plan);
  if (current.completedItemIds.includes(itemId)) return;

  const updated: PlanProgress = {
    completedItemIds: [...current.completedItemIds, itemId],
  };

  localStorage.setItem(key, JSON.stringify(updated));
}
