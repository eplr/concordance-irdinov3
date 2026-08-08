export default function FundNotFound() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#BBA46B' }}>
        Concordance · fidestra
      </span>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#183148', margin: 0 }}>
        Aucun score publié pour ce fonds
      </h1>
      <p style={{ color: '#6b6050', fontSize: '0.97rem', margin: 0, lineHeight: 1.65 }}>
        Le jeu de données correspondant à cet identifiant est introuvable dans <code>public/data</code>.
        Vérifiez l’orthographe de l’URL ou consultez la liste des scores publiés.
      </p>
    </div>
  )
}
