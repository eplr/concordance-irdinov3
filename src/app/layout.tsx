import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'fidestra | Concordance SFDR — IRDInov 3',
  description: 'Audit de cohérence documentaire SFDR — FPCI IRDInov 3 — IRDI Capital Investissement · Grille TermIndex v1.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: '#0f1117', color: '#fff', minHeight: '100vh' }}>
        <header style={{ borderBottom: '1px solid #252d40', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15,17,23,0.95)', backdropFilter: 'blur(8px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span
                  style={{
                    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                    fontSize: '1.2rem',
                    letterSpacing: '0.04em',
                    color: '#fff',
                  }}
                >
                  fide<span style={{ color: '#c49228' }}>§</span>tra
                </span>
                <div style={{ width: 1, height: 16, backgroundColor: '#252d40' }} />
                <span style={{ color: '#7a869a', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Concordance SFDR
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  backgroundColor: 'rgba(96,165,250,0.1)',
                  color: '#60a5fa',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 999,
                  border: '1px solid rgba(96,165,250,0.2)',
                }}>
                  Article 8 SFDR
                </span>
                <span style={{ color: '#7a869a', fontSize: '0.72rem', display: 'none' }} className="sm-show">
                  Sources publiques · Grille TermIndex v1.0
                </span>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer style={{ borderTop: '1px solid #252d40', marginTop: '6rem', padding: '2rem 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.72rem', color: '#7a869a' }}>
              <span>
                fidestra · Grille TermIndex SFDR v1.0 · Audit basé sur sources publiques uniquement · {new Date().getFullYear()}
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
