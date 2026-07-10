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
      <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#60a5fa' }}>
          Concordance SFDR · Grille TermIndex v1.0
        </span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff', margin: 0 }}>
          Audit de cohérence documentaire
        </h1>
        <p style={{ color: '#7a869a', fontSize: '0.9rem', maxWidth: 680, margin: 0 }}>
          Vérification de la concordance entre les cinq couches documentaires du FPCI IRDInov 3
          au regard du règlement SFDR (UE 2019/2088) et de la RTS (UE 2022/1288).
          Produit par fidestra · {fmtDate(data.generated_at)}
        </p>
        {/* Note méthodologique */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          backgroundColor: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)',
          borderRadius: 10, padding: '10px 14px', maxWidth: 680,
        }}>
          <span style={{ fontSize: '0.8rem', color: '#60a5fa', flexShrink: 0 }}>ℹ</span>
          <span style={{ fontSize: '0.75rem', color: '#7a869a', lineHeight: 1.5 }}>
            Cet audit repose sur des sources publiques uniquement (irdi.fr, rapports ESG 2021–2024,
            rapport Article 29 LEC). Il mesure la transparence documentaire publique, non la conformité
            interne. Qualité de données : {data.data_quality}/5 — {data.data_quality_label}.
          </span>
        </div>
      </section>

      {/* ── KPIs ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {[
          { label: 'Fonds audité', value: data.fund, sub: data.sgp, mono: false },
          { label: 'Classification', value: data.sfdr_classification, sub: data.entity_type, mono: false },
          { label: 'Encours', value: `${data.encours_me} M€`, sub: 'Premier closing 2023', mono: false },
          { label: 'Écarts identifiés', value: `${data.gaps.length}`, sub: '2 critiques · 3 élevés · 2 moyens', mono: true },
        ].map(kpi => (
          <div key={kpi.label} style={{
            backgroundColor: '#171b26', border: '1px solid #252d40',
            borderRadius: 12, padding: '16px',
          }}>
            <div style={{ fontSize: kpi.mono ? '2rem' : '1rem', fontWeight: 800, color: kpi.mono ? '#60a5fa' : '#fff', lineHeight: 1.2 }}>{kpi.value}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', marginTop: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: '0.7rem', color: '#7a869a', marginTop: 2 }}>{kpi.sub}</div>
          </div>
        ))}
      </section>

      {/* ── Score global ── */}
      <section style={{ backgroundColor: '#171b26', border: '1px solid #252d40', borderRadius: 16, padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#7a869a', marginBottom: 4 }}>Score SFDR pondéré global · FPCI IRDInov 3</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 1, color: scoreC }}>
                {fmtPct(data.overall_score)}
              </span>
              <GradeBadge grade={data.overall_grade} size="lg" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{gradeLabel(data.overall_grade)}</div>
                <div style={{ fontSize: '0.72rem', color: '#7a869a', marginTop: 2 }}>Niveau 1–2 · Sources publiques</div>
              </div>
            </div>
          </div>
          {/* Barres pondérées */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 280 }}>
            {data.parties.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.7rem', color: '#7a869a', width: 80, flexShrink: 0 }}>
                  Partie {p.id} · {Math.round(p.weight * 100)} %
                </span>
                <div style={{ flex: 1 }}>
                  <ScoreBar value={p.pct} height={5} color={scoreColor(p.pct)} />
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, width: 36, textAlign: 'right', color: scoreColor(p.pct) }}>
                  {fmtPct(p.pct, 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ScoreBar value={data.overall_score} height={10} color={scoreC} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.68rem', color: '#7a869a' }}>
          <span>F &lt; 25 %</span>
          <span>E ≥ 25 %</span>
          <span>D ≥ 40 %</span>
          <span>C ≥ 55 %</span>
          <span>B ≥ 70 %</span>
          <span>A ≥ 85 %</span>
        </div>
      </section>

      {/* ── Couches documentaires ── */}
      <section>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 }}>
            Analyse Concordance — les cinq couches documentaires
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#7a869a', marginTop: 4, marginBottom: 0 }}>
            Vérification de la cohérence entre chaque couche : nom → règlement → annexe SFDR → documentation commerciale → portefeuille réel.
          </p>
        </div>
        <LayerFlow layers={data.layers} />
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          {[
            { color: '#22c55e', label: 'Cohérent' },
            { color: '#f59e0b', label: 'Partiel — écart possible' },
            { color: '#ef4444', label: 'Lacune — risque réglementaire' },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#7a869a' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Scores SFDR par partie ── */}
      <section>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
          Scores SFDR par partie
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {data.parties.map(p => (
            <PartieCard key={p.id} partie={p} />
          ))}
        </div>
      </section>

      {/* ── Matrice des écarts ── */}
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              Matrice des écarts de concordance
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#7a869a', marginTop: 4, marginBottom: 0 }}>
              {data.gaps.length} écarts identifiés depuis les sources publiques.
            </p>
          </div>
          <GapSummary gaps={data.gaps} />
        </div>
        <GapMatrix gaps={data.gaps} />
      </section>

      {/* ── Ce que révèle ce rapport ── */}
      <section style={{ backgroundColor: 'rgba(96,165,250,0.04)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 16, padding: '24px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 12 }}>
          Ce que révèle ce rapport
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#7a869a', lineHeight: 1.7, margin: 0 }}>
          Le cas IRDInov 3 est <strong style={{ color: '#fff' }}>représentatif du marché</strong> : une intention ESG réelle et documentée
          au niveau entité, mais une traduction documentaire fonds par fonds incomplète.
          Les écarts ne résultent pas d'une mauvaise volonté — ils résultent d'une déconnexion
          entre les cinq couches qui s'écrivent à des moments différents, par des équipes différentes.
        </p>
        <p style={{ fontSize: '0.85rem', color: '#7a869a', lineHeight: 1.7, margin: '12px 0 0' }}>
          C'est précisément ce que la <strong style={{ color: '#60a5fa' }}>Grille Concordance</strong> audite :
          non pas la stratégie, mais la cohérence entre ce qui est promis et ce qui est prouvable.
          Reporting 21 collecte. ECOCERT note la maturité. Concordance vérifie que les trois
          se disent la même chose.
        </p>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(96,165,250,0.1)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 500 }}>Contact :</span>
          <span style={{ fontSize: '0.72rem', color: '#7a869a' }}>it@fidestra.fr</span>
          <span style={{ fontSize: '0.72rem', color: '#252d40' }}>·</span>
          <span style={{ fontSize: '0.72rem', color: '#7a869a' }}>Sources : irdi.fr · Rapports ESG 2021–2024 · Rapport Article 29 LEC 2024</span>
        </div>
      </section>

    </div>
  )
}
