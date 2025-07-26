export default function AuthErrorPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1a1a2e', color: '#e0e0e0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>Authentication Error</h1>
      <p style={{ marginBottom: 24 }}>There was a problem signing you in with Google. Please try again or contact support if the problem persists.</p>
      <a href="/login" style={{ color: '#00c2ff', fontWeight: 'bold', fontSize: '1.2rem' }}>Back to Login</a>
    </div>
  );
} 