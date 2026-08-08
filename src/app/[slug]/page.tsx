import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConcordanceDashboard } from '@/components/ConcordanceDashboard'
import { listAuditSlugs, loadAuditData } from '@/lib/audit-data'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await listAuditSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await loadAuditData(params.slug)
  if (!data) {
    return { title: 'fidestra | Concordance – Fonds introuvable' }
  }
  return {
    title: `fidestra | Concordance – ${data.fund}`,
    description: `Audit de cohérence documentaire SFDR – ${data.fund} – ${data.sgp} · Indice de Concordance v1.0`,
  }
}

export const dynamicParams = true

export default async function FundPage({ params }: PageProps) {
  const data = await loadAuditData(params.slug)

  if (!data) {
    notFound()
  }

  return <ConcordanceDashboard data={data} />
}
