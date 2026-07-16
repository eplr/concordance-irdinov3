import { GradeBadge, LayerFlow, PartieCard, GapMatrix, GapSummary, ScoreBar } from '@/components/Charts'
import { gradeColor, gradeLabel, scoreColor, fmtPct, fmtDate, type AuditData } from '@/lib/types'
import auditData from '../../public/data/irdinov3_audit.json'

const data = auditData as AuditData

export default function Home() {
  const scoreC = scoreColor(data.overall_score)
  const gradeC = gradeColor(data.overall_grade)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

      {/* ── Hero ── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4a90d4' }}>
          Concordance SFDR · Indice de Concordance v1.0
        </span>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, lineHeight: 1.1, color: '#dceaf8', margin: 0 }}>
          Audit de cohérence documentaire
        </h1>
        <p style={{ color: '#7da5c5', fontSize: '1rem', maxWidth: 680, margin: 0 }}>
          Vérification de la concordance entre les cinq couches documentaires du FPCI IRDInov\u00a03
          au regard du règlement SFDR (UE\u00a02019/2088) et de la RTS (UE\u00a02022/1288).
          Produit par fidestra · {fmtDate(data.generated_at)}
        </p>
        {/* Note méthodologique */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          backgroundColor: 'rgba(74,144,212,0.08)', border: '1px solid rgba(74,144,212,0.2)',
          borderRadius: 10, padding: '12px 16px', maxWidth: 680,
        }}>
          <span style={{ fontSize: '0.95rem', color: '#4a90d4', flexShrink: 0 }}>ℹ</span>
          <span style={{ fontSize: '0.87rem', color: '#7da5c5', lineHeight: 1.6 }}>
            Cet audit repose sur des sources publiques uniquement (irdi.fr, rapports ESG 2021–2024,
            rapport Article\u00a029 LEC). Il mesure la transparence documentaire publique, non la conformité
            interne. Qualité de données\u00a0: {data.data_quality}/5 — {data.data_quality_label}.
          </span>
        </div>
      </section>

      {/* ── KPIs ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
        {[
          { label: 'Fonds audité', value: data.fund, sub: data.sgp, mono: false },
          { label: 'Classification', value: data.sfdr_classification, sub: data.entity_type, mono: false },
          { label: 'Encours', value: `${data.encours_me}\u00a0M€`, sub: 'Premier closing 2023', mono: false },
          { label: 'Écarts identifiés', value: `${data.gaps.length}`, sub: '2\u00a0critiques · 3\u00a0élevés · 2\u00a0moyens', mono: true },
        ].map(kpi => (
          <div key={kpi.label} style={{
            backgroundColor: '#132238', border: '1px solid #1c3050',
            borderRadius: 14, padding: '20px',
          }}>
            <div style={{ fontSize: kpi.mono ? '2.2rem' : '1.1rem', fontWeight: 800, color: kpi.mono ? '#4a90d4' : '#dceaf8', lineHeight: 1.2 }}>{kpi.value}</div>
            <div style={{ fontSize: '0.87rem', fontWeight: 600, color: '#dceaf8', marginTop: 5 }}>{kpi.label}</div>
            <div style={{ fontSize: '0.82rem', color: '#7da5c5', marginTop: 3 }}>{kpi.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Score global ── */}
      <section style={{ backgroundColor: '#132238', border: '1px solid #1c3050', borderRadius: 18, padding: '28px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: '0.87rem', color: '#7da5c5', marginBottom: 6 }}>Score pondéré global · FPCI IRDInov\u00a03</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, color: scoreC }}>
                {fmtPct(data.overall_score)}
              </span>
              <GradeBadge grade={data.overall_grade} size="lg" />
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#dceaf8' }}>{gradeLabel(data.overall_grade)}</div>
                <div style={{ fontSize: '0.82rem', color: '#7da5c5', marginTop: 3 }}>Indice de Concordance · Sources publiques</div>
              </div>
            </div>
          </div>
          {/* Barres pondérées */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 290 }}>
            {data.parties.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.82rem', color: '#7da5c5', width: 90, flexShrink: 0 }}>
                  Partie\u00a0{p.id} · {Math.round(p.weight * 100)}\u00a0%
                </span>
                <div style={{ flex: 1 }}>
                  <ScoreBar value={p.pct} height={6} color={scoreColor(p.pct)} />
                </div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, width: 40, textAlign: 'right', color: scoreColor(p.pct) }}>
                  {fmtPct(p.pct, 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ScoreBar value={data.overall_score} height={12} color={scoreC} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.78rem', color: '#7da5c5' }}>
          <span>F &lt; 25\u00a0%</span>
          <span>E ≥ 25\u00a0%</span>
          <span>D ≥ 40\u00a0%</span>
          <span>C ≥ 55\u00a0%</span>
          <span>B ≥ 70\u00a0%</span>
          <span>A ≥ 85\u00a0%</span>
        </div>
      </section>

      {/* ── Couches documentaires ── */}
      <section>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#dceaf8', margin: 0 }}>
            Analyse Concordance — les cinq couches documentaires
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#7da5c5', marginTop: 6, marginBottom: 0 }}>
            Vérification de la cohérence entre chaque couche\u00a0: nom → règlement → annexe SFDR → documentation commerciale → portefeuille réel.
          </p>
        </div>
        <LayerFlow layers={data.layers} />
        <div style={{ display: 'flex', gap: 14, marginTop: 14, flexWrap: 'wrap' }}>
          {[
            { color: '#1ab394', label: 'Cohérent' },
            { color: '#e8923a', label: 'Partiel — écart possible' },
            { color: '#d4555a', label: 'Lacune — risque réglementaire' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.82rem', color: '#7da5c5' }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: color }} />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Scores SFDR par partie ── */}
      <section>
        <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#dceaf8', margin: '0 0 18px' }}>
          Scores SFDR par partie
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14 }}>
          {data.parties.map(p => (
            <PartieCard key={p.id} partie={p} />
          ))}
        </div>
      </section>

      {/* ── Matrice des écarts ── */}
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 18 }}>
          <div>
            <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#dceaf8', margin: 0 }}>
              Matrice des écarts de concordance
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#7da5c5', marginTop: 6, marginBottom: 0 }}>
              {data.gaps.length} écarts identifiés depuis les sources publiques.
            </p>
          </div>
          <GapSummary gaps={data.gaps} />
        </div>
        <GapMatrix gaps={data.gaps} />
      </section>

      {/* ── Ce que révèle ce rapport ── */}
      <section style={{ backgroundColor: 'rgba(74,144,212,0.06)', border: '1px solid rgba(74,144,212,0.18)', borderRadius: 18, padding: '28px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dceaf8', marginTop: 0, marginBottom: 14 }}>
          Ce que révèle ce rapport
        </h3>
        <p style={{ fontSize: '0.97rem', color: '#7da5c5', lineHeight: 1.75, margin: 0 }}>
          Le cas IRDInov\u00a03 est <strong style={{ color: '#dceaf8' }}>représentatif du marché</strong>\u00a0: une intention ESG réelle et documentée
          au niveau entité, mais une traduction documentaire fonds par fonds incomplète.
          Les écarts ne résultent pas d'une mauvaise volonté — ils résultent d'une déconnexion
          entre les cinq couches qui s'écrivent à des moments différents, par des équipes différentes.
        </p>
        <p style={{ fontSize: '0.97rem', color: '#7da5c5', lineHeight: 1.75, margin: '14px 0 0' }}>
          C'est précisément ce que la <strong style={{ color: '#4a90d4' }}>Méthode Concordance</strong> audite\u00a0:
          non pas la stratégie, mais la cohérence entre ce qui est promis et ce qui est prouvable.
          Reporting\u00a021 collecte. ECOCERT note la maturité. Concordance vérifie que les trois
          se disent la même chose.
        </p>
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid rgba(74,144,212,0.12)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: '0.82rem', color: '#4a90d4', fontWeight: 500 }}>Contact\u00a0:</span>
          <span style={{ fontSize: '0.82rem', color: '#7da5c5' }}>it@fidestra.fr</span>
          <span style={{ fontSize: '0.82rem', color: '#1c3050' }}>·</span>
          <span style={{ fontSize: '0.82rem', color: '#7da5c5' }}>Sources\u00a0: irdi.fr · Rapports ESG 2021–2024 · Rapport Article\u00a029 LEC 2024</span>
        </div>
      </section>

    </div>
  )
}
