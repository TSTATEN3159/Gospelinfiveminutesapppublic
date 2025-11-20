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
  
  // Count completed DAYS, not individual items
  let completedDays = 0;
  for (const day of plan.days) {
    const dayItemIds = day.items.map(item => item.id);
    const allDayItemsCompleted = dayItemIds.every(id => completedIds.includes(id));
    if (allDayItemsCompleted && dayItemIds.length > 0) {
      completedDays++;
    }
  }

  const totalDays = plan.days.length;
  const ratio = totalDays === 0 ? 0 : completedDays / totalDays;

  return { completed: completedDays, total: totalDays, ratio, completedItemIds: completedIds };
}

export function markItemCompleted(plan: DiscipleshipPlan, itemId: string) {
  const key = getStorageKey(plan.id);
  const current = loadPlanProgress(plan);
  if (current.completedItemIds.includes(itemId)) return;

  const updated: PlanProgress = {
    completedItemIds: [...current.completedItemIds, itemId],
  };

  localStorage.setItem(key, JSON.stringify(updated));
  
  // Trigger storage event for UI updates
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('discipleshipProgressChanged', { 
      detail: { planId: plan.id, itemId } 
    }));
  }
}
