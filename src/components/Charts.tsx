'use client'

import { gradeColor, scoreColor, LAYER_COLORS, LAYER_LABELS, PRIORITY_COLORS, fmtPct, type Layer, type Gap, type Partie } from '@/lib/types'

// ── Barre de score ────────────────────────────────────────────────────────────

interface ScoreBarProps {
  value: number
  max?: number
  color?: string
  height?: number
  showValue?: boolean
}

export function ScoreBar({ value, max = 100, color, height = 6, showValue = false }: ScoreBarProps) {
  const pct = Math.min(100, (value / max) * 100)
  const c = color ?? scoreColor(pct)
  return (
    <div className="w-full">
      {showValue && (
        <div className="flex justify-end mb-1">
          <span className="text-xs font-medium" style={{ color: c }}>{value}/{max}</span>
        </div>
      )}
      <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: '#1e2436' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: c }}
        />
      </div>
    </div>
  )
}

// ── Badge Note ────────────────────────────────────────────────────────────────

export function GradeBadge({ grade, size = 'md' }: { grade: string; size?: 'sm' | 'md' | 'lg' }) {
  const c = gradeColor(grade)
  const dim = size === 'sm' ? 24 : size === 'lg' ? 52 : 36
  const fs = size === 'sm' ? 11 : size === 'lg' ? 22 : 15
  return (
    <div
      style={{
        width: dim, height: dim,
        backgroundColor: c,
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: fs,
        color: ['A', 'B', 'C'].includes(grade) ? '#000' : '#fff',
        boxShadow: `0 0 16px ${c}50`,
        flexShrink: 0,
      }}
    >
      {grade}
    </div>
  )
}

// ── Couches documentaires ─────────────────────────────────────────────────────

export function LayerFlow({ layers }: { layers: Layer[] }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-2">
      {layers.map((layer, i) => {
        const c = LAYER_COLORS[layer.status]
        const label = LAYER_LABELS[layer.status]
        const isLast = i === layers.length - 1
        return (
          <div key={layer.id} className="flex sm:flex-col items-center gap-2 flex-1">
            {/* Card */}
            <div
              className="flex-1 w-full rounded-xl p-3 border transition-all"
              style={{ borderColor: `${c}40`, backgroundColor: `${c}08` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-white/60">C{layer.id}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${c}20`, color: c }}
                >
                  {label}
                </span>
              </div>
              <div className="text-sm font-semibold text-white leading-tight mb-1">{layer.name}</div>
              <div className="text-xs text-white/50 leading-relaxed">{layer.detail}</div>
            </div>
            {/* Flèche */}
            {!isLast && (
              <div className="text-white/20 font-bold text-lg sm:rotate-90 flex-shrink-0">→</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Parties SFDR ──────────────────────────────────────────────────────────────

export function PartieCard({ partie }: { partie: Partie }) {
  const c = scoreColor(partie.pct)
  return (
    <div className="rounded-xl border p-4 space-y-3" style={{ borderColor: '#252d40', backgroundColor: '#171b26' }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-bold text-white/40 uppercase tracking-wider">Partie {partie.id}</div>
          <div className="text-sm font-semibold text-white mt-0.5">{partie.name}</div>
          <div className="text-xs text-white/40">{partie.articles}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-black" style={{ color: c }}>{fmtPct(partie.pct, 0)}</div>
          <div className="text-xs text-white/40">{partie.score}/{partie.max} pts</div>
        </div>
      </div>
      <ScoreBar value={partie.pct} height={6} color={c} />
      <div className="text-xs text-white/30">Pondération : {Math.round(partie.weight * 100)} %</div>
      {/* Critères */}
      <div className="space-y-1.5 pt-1 border-t border-white/5">
        {partie.criteria.map(cr => {
          const pct = (cr.score / cr.max) * 100
          const cc = scoreColor(pct)
          return (
            <div key={cr.id} className="flex items-center gap-2">
              <div className="w-24 flex-shrink-0">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#1e2436' }}>
                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: cc, borderRadius: 9999 }} />
                </div>
              </div>
              <span className="text-xs text-white/50 flex-1 truncate">{cr.name}</span>
              <span className="text-xs font-mono flex-shrink-0" style={{ color: cc }}>{cr.score}/{cr.max}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Matrice des écarts ────────────────────────────────────────────────────────

export function GapMatrix({ gaps }: { gaps: Gap[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#252d40' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-xs uppercase tracking-wider" style={{ borderColor: '#252d40', color: '#7a869a' }}>
            <th className="text-left px-4 py-3 font-medium w-16">Écart</th>
            <th className="text-left px-4 py-3 font-medium">Description</th>
            <th className="text-center px-3 py-3 font-medium hidden sm:table-cell">Couches</th>
            <th className="text-center px-3 py-3 font-medium">Priorité</th>
            <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Risque AMF</th>
          </tr>
        </thead>
        <tbody>
          {gaps.map((gap, i) => {
            const c = PRIORITY_COLORS[gap.priority_key]
            return (
              <tr
                key={gap.id}
                className="border-b last:border-0 transition-colors"
                style={{ borderColor: '#252d40', backgroundColor: i % 2 === 0 ? '#171b26' : '#131720' }}
              >
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-bold" style={{ color: '#60a5fa' }}>{gap.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-white text-sm">{gap.description}</div>
                  <div className="text-xs mt-0.5 hidden md:block" style={{ color: '#7a869a' }}>{gap.recommendation}</div>
                </td>
                <td className="px-3 py-3 text-center hidden sm:table-cell">
                  <span className="font-mono text-xs" style={{ color: '#7a869a' }}>{gap.layers}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${c}15`, color: c }}
                  >
                    {gap.priority}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-xs" style={{ color: '#7a869a' }}>{gap.amf_risk}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Compteur d'écarts par priorité ────────────────────────────────────────────

export function GapSummary({ gaps }: { gaps: Gap[] }) {
  const counts = {
    critical: gaps.filter(g => g.priority_key === 'critical').length,
    high: gaps.filter(g => g.priority_key === 'high').length,
    medium: gaps.filter(g => g.priority_key === 'medium').length,
  }
  return (
    <div className="flex gap-3 flex-wrap">
      {[
        { key: 'critical', label: 'Critique', count: counts.critical },
        { key: 'high', label: 'Élevé', count: counts.high },
        { key: 'medium', label: 'Moyen', count: counts.medium },
      ].map(({ key, label, count }) => {
        const c = PRIORITY_COLORS[key]
        return (
          <div key={key} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${c}12` }}>
            <span className="text-xl font-black" style={{ color: c }}>{count}</span>
            <span className="text-xs font-medium" style={{ color: c }}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
