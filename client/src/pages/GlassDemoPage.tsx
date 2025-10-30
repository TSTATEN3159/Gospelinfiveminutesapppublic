import { useState } from "react";
import { GlassNavBar, GlassCard, GlassTabBar, GlassModal } from "@/components/Glass";
import { Home, Search, Heart, User, Settings, Play, BookOpen, Sparkles } from "lucide-react";

export default function GlassDemoPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      paddingBottom: 80
    }}>
      {/* Top Navigation */}
      <GlassNavBar 
        title="Glass Demo" 
        left={<Settings size={20} />}
        right={<span style={{ fontSize: 20 }}>⋯</span>}
      />

      {/* Main Content */}
      <main style={{ padding: 16, display: "grid", gap: 16, maxWidth: 800, margin: "0 auto" }}>
        
        {/* Hero Card */}
        <GlassCard>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <Sparkles size={48} style={{ margin: "0 auto 16px", display: "block" }} />
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>Glassmorphism</h1>
            <p style={{ margin: "8px 0 0", opacity: 0.8 }}>
              Beautiful frosted glass effects with backdrop blur
            </p>
          </div>
        </GlassCard>

        {/* Feature Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <GlassCard>
            <Play size={32} style={{ marginBottom: 12 }} />
            <h3 style={{ margin: 0, fontSize: 18 }}>Daily Verse</h3>
            <p style={{ margin: "6px 0 0", opacity: 0.8, fontSize: 14 }}>
              "For by grace you have been saved through faith..."
            </p>
          </GlassCard>

          <GlassCard>
            <BookOpen size={32} style={{ marginBottom: 12 }} />
            <h3 style={{ margin: 0, fontSize: 18 }}>Faith Videos</h3>
            <p style={{ margin: "6px 0 0", opacity: 0.8, fontSize: 14 }}>
              Watch and be strengthened in your walk.
            </p>
          </GlassCard>

          <GlassCard>
            <Heart size={32} style={{ marginBottom: 12 }} />
            <h3 style={{ margin: 0, fontSize: 18 }}>Saved Content</h3>
            <p style={{ margin: "6px 0 0", opacity: 0.8, fontSize: 14 }}>
              Your bookmarked verses and notes.
            </p>
          </GlassCard>
        </div>

        {/* Interactive Card */}
        <GlassCard>
          <h2 style={{ margin: 0, fontSize: 24 }}>Interactive Components</h2>
          <p style={{ margin: "8px 0 16px", opacity: 0.8 }}>
            Glass components have beautiful hover and press effects.
          </p>
          <button 
            onClick={() => setModalOpen(true)}
            className="glass glass-pressable"
            style={{ 
              padding: "12px 24px", 
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Open Glass Modal
          </button>
        </GlassCard>

        {/* Feature List */}
        <GlassCard>
          <h2 style={{ margin: 0, fontSize: 24 }}>Features</h2>
          <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>🌓 Auto light/dark mode support</li>
            <li style={{ marginBottom: 8 }}>♿ Accessibility (respects reduced transparency)</li>
            <li style={{ marginBottom: 8 }}>📱 iOS safe area insets for bars</li>
            <li style={{ marginBottom: 8 }}>🎯 Smooth hover and press interactions</li>
            <li style={{ marginBottom: 8 }}>🔍 Backdrop blur with color saturation</li>
            <li style={{ marginBottom: 8 }}>💫 Subtle inner highlight rings</li>
          </ul>
        </GlassCard>

        {/* Color Scheme Info */}
        <GlassCard>
          <h2 style={{ margin: 0, fontSize: 24 }}>Design Tokens</h2>
          <div style={{ marginTop: 12, display: "grid", gap: 8, fontSize: 14, fontFamily: "monospace" }}>
            <div>--glass-bg: rgba(255, 255, 255, 0.16)</div>
            <div>--glass-blur: 20px</div>
            <div>--glass-sat: 180%</div>
            <div>--glass-radius: 24px</div>
          </div>
        </GlassCard>

      </main>

      {/* Bottom Tab Bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <GlassTabBar>
          <button className="glass glass-pressable" style={{ padding: 10, borderRadius: 14, border: "none", cursor: "pointer" }}>
            <Home size={20} />
          </button>
          <button className="glass glass-pressable" style={{ padding: 10, borderRadius: 14, border: "none", cursor: "pointer" }}>
            <Search size={20} />
          </button>
          <button className="glass glass-pressable" style={{ padding: 10, borderRadius: 14, border: "none", cursor: "pointer" }}>
            <Play size={20} />
          </button>
          <button className="glass glass-pressable" style={{ padding: 10, borderRadius: 14, border: "none", cursor: "pointer" }}>
            <Heart size={20} />
          </button>
          <button className="glass glass-pressable" style={{ padding: 10, borderRadius: 14, border: "none", cursor: "pointer" }}>
            <User size={20} />
          </button>
        </GlassTabBar>
      </div>

      {/* Glass Modal */}
      <GlassModal open={modalOpen} onClose={() => setModalOpen(false)} title="Glass Modal Demo">
        <p style={{ margin: "8px 0" }}>
          This is a beautiful glass modal with a frosted overlay effect.
        </p>
        <p style={{ margin: "8px 0", opacity: 0.8 }}>
          Click outside or press the button below to close.
        </p>
        <button 
          onClick={() => setModalOpen(false)}
          className="glass glass-pressable"
          style={{ 
            padding: "10px 20px", 
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            marginTop: 8
          }}
        >
          Close Modal
        </button>
      </GlassModal>
    </div>
  );
}
