import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'fidestra | Concordance SFDR',
  description: 'Audit de cohérence documentaire SFDR · Indice de Concordance v1.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: '#F8F6F0', color: '#183148', minHeight: '100vh' }}>
        <header style={{ borderBottom: '1px solid rgba(31,58,88,0.4)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(24,49,72,0.97)', backdropFilter: 'blur(8px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif", fontSize: '1.25rem', letterSpacing: '0.04em', color: '#f0ebe2' }}>
                  fide<span style={{ color: '#BBA46B' }}>§</span>tra
                </span>
                <div style={{ width: 1, height: 18, backgroundColor: 'rgba(187,164,107,0.35)' }} />
                <span style={{ color: '#a8a490', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Concordance SFDR
                </span>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer style={{ borderTop: '1px solid rgba(31,58,88,0.25)', marginTop: '6rem', padding: '2rem 0', backgroundColor: '#183148' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem', color: '#a8a490' }}>
              <span>fidestra · Indice de Concordance SFDR v1.0 · Audit basé sur sources publiques uniquement · {new Date().getFullYear()}</span>
              <span>Ce rapport ne constitue pas un avis juridique ou réglementaire. Il mesure la transparence documentaire publique, non la conformité interne.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
