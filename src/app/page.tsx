import Link from 'next/link'
import { listAuditSlugs, loadAuditData } from '@/lib/audit-data'
import { gradeColor, fmtPct } from '@/lib/types'

export default async function Home() {
  const slugs = await listAuditSlugs()
  const funds = await Promise.all(
    slugs.map(async slug => ({ slug, data: await loadAuditData(slug) }))
  )

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#BBA46B' }}>
          Concordance · fidestra
        </span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: '#183148', margin: 0 }}>
          Scores Concordance publiés
        </h1>
        <p style={{ color: '#6b6050', fontSize: '0.97rem', margin: 0, lineHeight: 1.65 }}>
          Sélectionnez un fonds pour consulter son audit de cohérence documentaire.
        </p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {funds.map(({ slug, data }) => data && (
          <Link
            key={slug}
            href={`/${slug}/`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 22px', borderRadius: 14, border: '1px solid #1f3a58', backgroundColor: '#183148', textDecoration: 'none' }}
          >
            <div>
              <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#f0ebe2' }}>{data.fund}</div>
              <div style={{ fontSize: '0.85rem', color: '#a8a490', marginTop: 3 }}>{data.sgp} · {data.sfdr_classification}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 900, color: gradeColor(data.overall_grade) }}>{fmtPct(data.overall_score, 0)}</span>
              <span
                style={{ width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, backgroundColor: gradeColor(data.overall_grade), color: ['A', 'B', 'C'].includes(data.overall_grade) ? '#000' : '#fff' }}
              >
                {data.overall_grade}
              </span>
            </div>
          </Link>
        ))}
        {funds.length === 0 && (
          <p style={{ color: '#6b6050', fontSize: '0.92rem' }}>Aucun score Concordance publié pour l’instant.</p>
        )}
      </section>
    </div>
  )
}
