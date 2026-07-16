import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'fidestra | Concordance SFDR — IRDInov 3',
  description: 'Audit de cohérence documentaire SFDR — FPCI IRDInov 3 — IRDI Capital Investissement · Indice de Concordance v1.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: '#0c1929', color: '#dceaf8', minHeight: '100vh' }}>
        <header style={{ borderBottom: '1px solid #1c3050', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(12,25,41,0.95)', backdropFilter: 'blur(8px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                    fontSize: '1.25rem',
                    letterSpacing: '0.04em',
                    color: '#dceaf8',
                  }}
                >
                  fide<span style={{ color: '#c49228' }}>§</span>tra
                </span>
                <div style={{ width: 1, height: 18, backgroundColor: '#1c3050' }} />
                <span style={{ color: '#7da5c5', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Concordance SFDR
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  backgroundColor: 'rgba(74,144,212,0.12)',
                  color: '#4a90d4',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: 999,
                  border: '1px solid rgba(74,144,212,0.25)',
                }}>
                  Article\u00a08 SFDR
                </span>
                <span style={{ color: '#7da5c5', fontSize: '0.82rem', display: 'none' }} className="sm-show">
                  Sources publiques · Indice de Concordance v1.0
                </span>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer style={{ borderTop: '1px solid #1c3050', marginTop: '6rem', padding: '2rem 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem', color: '#7da5c5' }}>
              <span>
                fidestra · Indice de Concordance SFDR v1.0 · Audit basé sur sources publiques uniquement · {new Date().getFullYear()}
              </span>
              <span>
                Ce rapport ne constitue pas un avis juridique ou réglementaire. Il mesure la transparence documentaire publique, non la conformité interne.
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
