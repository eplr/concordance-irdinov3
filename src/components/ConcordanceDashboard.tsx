import { GradeBadge, LayerFlow, PartieCard, GapMatrix, GapSummary, ScoreBar } from '@/components/Charts'
import { gradeColor, gradeLabel, scoreColor, fmtPct, fmtDate, fmtMoneyMillions, NBSP, type AuditData } from '@/lib/types'

function prioritySummary(data: AuditData): string {
  const labels: Record<string, string> = {
    critical: 'critiques',
    high: 'élevés',
    medium: 'moyens',
    low: 'faibles',
  }

  return ['critical', 'high', 'medium', 'low']
    .map(key => ({ key, count: data.gaps.filter(gap => gap.priority_key === key).length }))
    .filter(({ count }) => count > 0)
    .map(({ key, count }) => `${count} ${labels[key]}`)
    .join(' · ')
}

export function ConcordanceDashboard({ data }: { data: AuditData }) {
  const scoreC = scoreColor(data.overall_score)
  const gradeC = gradeColor(data.overall_grade)
  const insights = data.report_insight ?? [
    `Le cas ${data.fund} illustre une intention ESG documentée, mais une traduction documentaire fonds par fonds encore incomplète.`,
    'La Méthode Concordance audite la cohérence entre ce qui est promis et ce qui est prouvable dans les sources publiques.',
  ]

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

      {/* ── Hero ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#BBA46B' }}>
          Concordance SFDR · Indice de Concordance v1.0
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, lineHeight: 1.1, color: '#183148', margin: 0 }}>
          Audit de cohérence documentaire
        </h1>
        <p style={{ color: '#6b6050', fontSize: '1rem', maxWidth: 680, margin: 0, lineHeight: 1.65 }}>
          Vérification de la concordance entre les cinq niveaux documentaires de {data.fund}
          au regard du règlement SFDR (UE 2019/2088), des RTS (UE 2022/1288) et des attentes AMF.
          Produit par fidestra · {fmtDate(data.generated_at)}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, backgroundColor: 'rgba(187,164,107,0.12)', border: '1px solid rgba(187,164,107,0.42)', borderRadius: 10, padding: '12px 16px', maxWidth: 680 }}>
          <span style={{ fontSize: '0.95rem', color: '#BBA46B', flexShrink: 0 }}>ℹ</span>
          <span style={{ fontSize: '0.87rem', color: '#6b6050', lineHeight: 1.65 }}>
            Cet audit repose sur des sources publiques uniquement. Il mesure la transparence documentaire publique,
            non la conformité interne. Qualité de données : {data.data_quality}/5 – {data.data_quality_label}.
          </span>
        </div>
      </section>

      {/* ── KPIs ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
        {[
          { label: 'Fonds audité', value: data.fund, sub: data.sgp, mono: false },
          { label: 'Classification', value: data.sfdr_classification, sub: data.entity_type, mono: false },
          { label: 'Encours', value: fmtMoneyMillions(data.encours_me), sub: data.encours_label ?? data.audit_scope, mono: false },
          { label: 'Écarts identifiés', value: `${data.gaps.length}`, sub: prioritySummary(data), mono: true },
        ].map(kpi => (
          <div key={kpi.label} style={{ backgroundColor: '#183148', border: '1px solid #1f3a58', borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: kpi.mono ? '2.2rem' : '1.1rem', fontWeight: 800, color: kpi.mono ? '#BBA46B' : '#f0ebe2', lineHeight: 1.2 }}>{kpi.value}</div>
            <div style={{ fontSize: '0.87rem', fontWeight: 600, color: '#f0ebe2', marginTop: 5 }}>{kpi.label}</div>
            <div style={{ fontSize: '0.82rem', color: '#a8a490', marginTop: 3 }}>{kpi.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Score global ── */}
      <section style={{ backgroundColor: '#183148', border: '1px solid #1f3a58', borderRadius: 18, padding: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: '0.87rem', color: '#a8a490', marginBottom: 6 }}>Score pondéré global · {data.fund}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, color: scoreC }}>
                {fmtPct(data.overall_score)}
              </span>
              <GradeBadge grade={data.overall_grade} size="lg" />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: gradeC }}>Note {data.overall_grade} · {gradeLabel(data.overall_grade)}</div>
                <div style={{ fontSize: '0.82rem', color: '#a8a490', marginTop: 3 }}>Indice de Concordance · Sources publiques</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 290 }}>
            {data.parties.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.82rem', color: '#a8a490', width: 90, flexShrink: 0 }}>Partie {p.id} · {fmtPct(p.weight * 100, 0)}</span>
                <div style={{ flex: 1 }}><ScoreBar value={p.pct} height={6} color={scoreColor(p.pct)} /></div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, width: 40, textAlign: 'right', color: scoreColor(p.pct) }}>{fmtPct(p.pct, 0)}</span>
              </div>
            ))}
          </div>
        </div>
        <ScoreBar value={data.overall_score} height={12} color={scoreC} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.78rem', color: '#a8a490' }}>
          <span>F &lt; 25{NBSP}%</span><span>E ≥ 25{NBSP}%</span><span>D ≥ 40{NBSP}%</span><span>C ≥ 55{NBSP}%</span><span>B ≥ 70{NBSP}%</span><span>A ≥ 85{NBSP}%</span>
        </div>
      </section>

      {data.scpi_metrics && (
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
          {[
            { label: 'Performance financière', value: fmtPct(data.scpi_metrics.performance_score ?? 0), sub: 'score composite SCPI' },
            { label: 'Impact ESG', value: fmtPct(data.scpi_metrics.impact_score ?? 0), sub: 'données publiques' },
            { label: 'Résilience', value: fmtPct(data.scpi_metrics.resilience_score ?? 0), sub: 'vacance, dette, liquidité' },
            { label: 'Taux d’occupation', value: fmtPct(data.scpi_metrics.tof ?? 0), sub: 'TOF publié' },
          ].map(kpi => (
            <div key={kpi.label} style={{ border: '1px solid rgba(31,58,88,0.25)', borderRadius: 14, padding: '18px', backgroundColor: '#fffaf0' }}>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#183148' }}>{kpi.value}</div>
              <div style={{ fontSize: '0.87rem', fontWeight: 700, color: '#183148', marginTop: 4 }}>{kpi.label}</div>
              <div style={{ fontSize: '0.82rem', color: '#6b6050', marginTop: 3 }}>{kpi.sub}</div>
            </div>
          ))}
        </section>
      )}

      {/* ── Niveaux documentaires ── */}
      <section>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#183148', margin: 0 }}>Analyse Concordance – les cinq niveaux documentaires</h2>
          <p style={{ fontSize: '0.92rem', color: '#6b6050', marginTop: 6, marginBottom: 0, lineHeight: 1.65 }}>
            Vérification de la cohérence entre chaque niveau : nom → règlement → annexe SFDR → documentation commerciale → portefeuille réel.
          </p>
        </div>
        <LayerFlow layers={data.layers} />
        <div style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
          {[
            { color: '#1ab394', label: 'Cohérent' },
            { color: '#e8923a', label: 'Partiel – écart possible' },
            { color: '#b85a5a', label: 'Lacune – risque réglementaire' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.82rem', color: '#6b6050' }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: color }} />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Scores SFDR par partie ── */}
      <section>
        <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#183148', margin: '0 0 18px' }}>Scores SFDR par partie</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14 }}>
          {data.parties.map(p => (<PartieCard key={p.id} partie={p} />))}
        </div>
      </section>

      {/* ── Matrice des écarts ── */}
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#183148', margin: 0 }}>Matrice des écarts de concordance</h2>
            <p style={{ fontSize: '0.92rem', color: '#6b6050', marginTop: 6, marginBottom: 0 }}>{data.gaps.length} écarts identifiés depuis les sources publiques.</p>
          </div>
          <GapSummary gaps={data.gaps} />
        </div>
        <GapMatrix gaps={data.gaps} />
      </section>

      {/* ── Ce que révèle ce rapport ── */}
      <section style={{ backgroundColor: '#183148', border: '1px solid rgba(187,164,107,0.25)', borderRadius: 18, padding: '28px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f0ebe2', marginTop: 0, marginBottom: 14 }}>Ce que révèle ce rapport</h3>
        {insights.map(insight => (
          <p key={insight} style={{ fontSize: '0.97rem', color: '#a8a490', lineHeight: 1.75, margin: '14px 0 0' }}>
            {insight}
          </p>
        ))}
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(187,164,107,0.18)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: '0.82rem', color: '#BBA46B', fontWeight: 500 }}>Contact :</span>
          <span style={{ fontSize: '0.82rem', color: '#a8a490' }}>it@fidestra.fr</span>
          <span style={{ fontSize: '0.82rem', color: '#1f3a58' }}>·</span>
          <span style={{ fontSize: '0.82rem', color: '#a8a490' }}>Sources : {(data.sources ?? ['sources publiques']).join(' · ')}</span>
        </div>
      </section>

    </div>
  )
}

