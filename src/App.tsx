import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import pwaLogo from '/pwa-192x192.png'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [usernameOrEmail, setUsernameOrEmail] = useState('lleao')
  const [password, setPassword] = useState('senha')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [count, setCount] = useState(0)
  const [showPortal, setShowPortal] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    if (count === 3 || count === 5 || count === 7) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 200)
    }

    if (count === 3) {
      if ('vibrate' in navigator) {
        navigator.vibrate(200)
      }
    }
    if (count === 5) {
      const audio = new Audio('/success.mp3')
      audio.play().catch(error => console.error("Error playing sound:", error))
    }
    if (count === 7) {
      setShowPortal(true)
    }
  }, [count])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://api-comunicacao-coorporativa.prd.coamo.com.br/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      })

      if (response.ok) {
        setIsLoggedIn(true)
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data.message || 'Erro ao realizar login. Verifique suas credenciais.')
      }
    } catch (err) {
      setError('Erro de conexão. Verifique se o servidor está acessível.')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <>
        <div className="gradient-bg"></div>
        <div className="login-container">
          <div className="glass-card login-card">
            <div className="logo" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
              <img src={pwaLogo} alt="PWA Logo" />
              <span>ModernPWA</span>
            </div>
            <h2 className="text-gradient">Bem-vindo</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Usuário ou Email</label>
                <input 
                  type="text" 
                  className="input-field"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="Seu usuário"
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input 
                  type="password" 
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="btn-primary login-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Autenticando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {showPortal && (
        <div className="portal-overlay">
          <div className="portal-header">
            <button className="btn-close" onClick={() => setShowPortal(false)}>✕ Fechar</button>
            <span>Portal Coamo</span>
          </div>
          <iframe
            src="https://web-portal-comunicacao-coorporativa.prd.coamo.com.br/login"
            title="Portal Coamo"
            className="portal-iframe"
          />
        </div>
      )}
      <div className="gradient-bg"></div>

      <nav>
        <div className="logo">
          <img src={pwaLogo} alt="PWA Logo" />
          <span>ModernPWA</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setIsLoggedIn(false)} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>Sair</button>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <h1 className="hero-title text-gradient">
            Dashboard <br /> Logado com Sucesso
          </h1>
          <p className="hero-subtitle">
            Você está autenticado. Explore as funcionalidades do seu Progressive Web App.
          </p>
          <div className="hero-actions">
            <button
              className={`btn-primary ${isShaking ? 'shake-animation' : ''}`}
              onClick={() => setCount((c) => c + 1)}
            >
              Interactive Counter: {count}
            </button>
          </div>
        </section>

        <section className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Ultra Fast</h3>
            <p>Optimized with Vite 6 for the best developer and user experience possible.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">📱</div>
            <h3>PWA Ready</h3>
            <p>Fully configured service worker and manifest for offline support and installation.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Design</h3>
            <p>Crafted with modern aesthetics, glassmorphism, and smooth animations.</p>
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <img
            src={heroImg}
            alt="Hero Background"
            style={{
              maxWidth: '100%',
              borderRadius: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
        <p>© 2026 ModernPWA. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
