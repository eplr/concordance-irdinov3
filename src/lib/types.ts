export interface Criterion {
  id: string
  name: string
  score: number
  max: number
  obs: string
}

export interface Partie {
  id: string
  name: string
  articles: string
  score: number
  max: number
  pct: number
  weight: number
  weighted: number
  criteria: Criterion[]
}

export interface Layer {
  id: number
  name: string
  status: 'ok' | 'partial' | 'gap'
  detail: string
}

export interface Gap {
  id: string
  description: string
  layers: string
  priority: string
  priority_key: 'critical' | 'high' | 'medium' | 'low'
  amf_risk: string
  recommendation: string
}

export interface AuditData {
  generated_at: string
  methodology: string
  fund: string
  sgp: string
  sfdr_classification: string
  encours_me: number
  entity_type: string
  audit_scope: string
  overall_score: number
  overall_grade: string
  data_quality: number
  data_quality_label: string
  parties: Partie[]
  layers: Layer[]
  gaps: Gap[]
}

export const GRADE_COLORS: Record<string, string> = {
  A: '#22c55e',
  B: '#84cc16',
  C: '#eab308',
  D: '#f97316',
  E: '#ef4444',
  F: '#dc2626',
}

export const LAYER_COLORS: Record<string, string> = {
  ok: '#22c55e',
  partial: '#f59e0b',
  gap: '#ef4444',
}

export const LAYER_LABELS: Record<string, string> = {
  ok: 'Cohérent',
  partial: 'Partiel',
  gap: 'Lacune',
}

export const PRIORITY_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#84cc16',
}

export function gradeColor(grade: string): string {
  return GRADE_COLORS[grade] ?? '#888888'
}

export function scoreColor(score: number): string {
  if (score >= 70) return '#60a5fa'
  if (score >= 45) return '#f59e0b'
  return '#ef4444'
}

export function gradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    A: 'Excellent',
    B: 'Bon',
    C: 'Moyen',
    D: 'Insuffisant',
    E: 'Initial',
    F: 'Non-conforme',
  }
  return labels[grade] ?? grade
}

const NBSP = '\u00a0'

export function fmtPct(value: number, decimals = 1): string {
  return value.toFixed(decimals).replace('.', ',') + NBSP + '%'
}

export function fmtDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}
