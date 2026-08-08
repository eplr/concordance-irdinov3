import { promises as fs } from 'fs'
import path from 'path'
import type { AuditData } from './types'

const DATA_DIR = path.join(process.cwd(), 'public', 'data')
const SLUG_RE = /^[a-z0-9-]+$/

export async function loadAuditData(slug: string): Promise<AuditData | null> {
  if (!SLUG_RE.test(slug)) return null

  const filePath = path.join(DATA_DIR, `${slug}.json`)

  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw) as AuditData
  } catch {
    return null
  }
}

export async function listAuditSlugs(): Promise<string[]> {
  const files = await fs.readdir(DATA_DIR)
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace(/\.json$/, ''))
    .filter(slug => SLUG_RE.test(slug))
    .filter(slug => !slug.endsWith('_audit'))
}

