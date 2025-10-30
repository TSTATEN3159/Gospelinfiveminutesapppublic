import React from "react";
import clsx from "clsx";

export const GlassCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={clsx("glass glass-pressable", className)} {...props}>
    <div className="glass-pad">{children}</div>
  </div>
);

export const GlassNavBar: React.FC<{ title?: string; left?: React.ReactNode; right?: React.ReactNode; className?: string; }> =
({ title, left, right, className }) => (
  <div className={clsx("glass-bar mask-top-fade", className)}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12, paddingInline: 16 }}>
      <div style={{ justifySelf: "start" }}>{left}</div>
      <div style={{ justifySelf: "center", fontWeight: 600 }}>{title}</div>
      <div style={{ justifySelf: "end" }}>{right}</div>
    </div>
  </div>
);

export const GlassTabBar: React.FC<{ children?: React.ReactNode; className?: string; }> =
({ children, className }) => (
  <div className={clsx("glass-tabbar mask-bottom-fade", className)}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, paddingInline: 16, alignItems: "center" }}>
      {children}
    </div>
  </div>
);

/* Simple modal with frosted sheet */
export const GlassModal: React.FC<{ open: boolean; onClose: () => void; title?: string; children?: React.ReactNode; }> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "color-mix(in oklab, CanvasText 18%, transparent)",
        display: "grid", placeItems: "center", padding: 20
      }}>
      <div className="glass" onClick={e => e.stopPropagation()} style={{ width: "min(680px, 96vw)" }}>
        <div className="glass-pad" style={{ display: "grid", gap: 12 }}>
          {title && <div style={{ fontWeight: 700 }}>{title}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};
