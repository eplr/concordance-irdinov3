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
  A: '#1ab394',
  B: '#52c277',
  C: '#e6be38',
  D: '#e8923a',
  E: '#d4555a',
  F: '#b93535',
}

export const LAYER_COLORS: Record<string, string> = {
  ok: '#1ab394',
  partial: '#e8923a',
  gap: '#d4555a',
}

export const LAYER_LABELS: Record<string, string> = {
  ok: 'Cohérent',
  partial: 'Partiel',
  gap: 'Lacune',
}

export const PRIORITY_COLORS: Record<string, string> = {
  critical: '#d4555a',
  high: '#e8923a',
  medium: '#e6be38',
  low: '#52c277',
}

export function gradeColor(grade: string): string {
  return GRADE_COLORS[grade] ?? '#888888'
}

export function scoreColor(score: number): string {
  if (score >= 70) return '#1ab394'
  if (score >= 45) return '#e8923a'
  return '#d4555a'
}

export function gradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    A: 'Excellent',
    B: 'Bon',
    C: 'Satisfaisant',
    D: 'Partiel',
    E: 'Insuffisant',
    F: 'Non conforme',
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
