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
          <span className="text-sm font-medium" style={{ color: c }}>{value}/{max}</span>
        </div>
      )}
      <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: '#101e32' }}>
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
  const dim = size === 'sm' ? 26 : size === 'lg' ? 54 : 38
  const fs = size === 'sm' ? 12 : size === 'lg' ? 23 : 16
  return (
    <div
      style={{
        width: dim, height: dim,
        backgroundColor: c,
        borderRadius: 9,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: fs,
        color: ['A', 'B', 'C'].includes(grade) ? '#000' : '#fff',
        boxShadow: `0 0 20px ${c}40`,
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
              className="flex-1 w-full rounded-xl p-4 border transition-all"
              style={{ borderColor: `${c}40`, backgroundColor: `${c}09` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-bold" style={{ color: '#a8a490' }}>C{layer.id}</span>
                <span
                  className="text-sm font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${c}20`, color: c }}
                >
                  {label}
                </span>
              </div>
              <div className="text-base font-semibold leading-tight mb-1" style={{ color: '#f0ebe2' }}>{layer.name}</div>
              <div className="text-sm leading-relaxed" style={{ color: '#a8a490' }}>{layer.detail}</div>
            </div>
            {/* Flèche */}
            {!isLast && (
              <div className="font-bold text-lg sm:rotate-90 flex-shrink-0" style={{ color: '#1f3a58' }}>→</div>
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
    <div className="rounded-xl border p-5 space-y-3" style={{ borderColor: '#1f3a58', backgroundColor: '#183148' }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-bold uppercase tracking-wider" style={{ color: '#a8a490' }}>Partie {partie.id}</div>
          <div className="text-base font-semibold mt-0.5" style={{ color: '#f0ebe2' }}>{partie.name}</div>
          <div className="text-sm" style={{ color: '#a8a490' }}>{partie.articles}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-3xl font-black" style={{ color: c }}>{fmtPct(partie.pct, 0)}</div>
          <div className="text-sm" style={{ color: '#a8a490' }}>{partie.score}/{partie.max} pts</div>
        </div>
      </div>
      <ScoreBar value={partie.pct} height={7} color={c} />
      <div className="text-sm" style={{ color: '#a8a490' }}>Pondération\u00a0: {Math.round(partie.weight * 100)}\u00a0%</div>
      {/* Critères */}
      <div className="space-y-2 pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {partie.criteria.map(cr => {
          const pct = (cr.score / cr.max) * 100
          const cc = scoreColor(pct)
          return (
            <div key={cr.id} className="flex items-center gap-2">
              <div className="w-24 flex-shrink-0">
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#101e32' }}>
                  <div style={{ width: `${pct}%`, height: '100%', backgroundColor: cc, borderRadius: 9999 }} />
                </div>
              </div>
              <span className="text-sm flex-1 truncate" style={{ color: '#a8a490' }}>{cr.name}</span>
              <span className="text-sm font-mono flex-shrink-0" style={{ color: cc }}>{cr.score}/{cr.max}</span>
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
    <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#1f3a58' }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-sm uppercase tracking-wider" style={{ borderColor: '#1f3a58', color: '#a8a490' }}>
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
                style={{ borderColor: '#1f3a58', backgroundColor: i % 2 === 0 ? '#183148' : '#101e32' }}
              >
                <td className="px-4 py-3">
                  <span className="font-mono text-sm font-bold" style={{ color: '#BBA46B' }}>{gap.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-base" style={{ color: '#f0ebe2' }}>{gap.description}</div>
                  <div className="text-sm mt-1 hidden md:block" style={{ color: '#a8a490' }}>{gap.recommendation}</div>
                </td>
                <td className="px-3 py-3 text-center hidden sm:table-cell">
                  <span className="font-mono text-sm" style={{ color: '#a8a490' }}>{gap.layers}</span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span
                    className="text-sm font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${c}15`, color: c }}
                  >
                    {gap.priority}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-sm" style={{ color: '#a8a490' }}>{gap.amf_risk}</span>
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
          <div key={key} className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: `${c}12` }}>
            <span className="text-2xl font-black" style={{ color: c }}>{count}</span>
            <span className="text-sm font-medium" style={{ color: c }}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}
