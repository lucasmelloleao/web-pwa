import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import pwaLogo from '/pwa-192x192.png'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count === 5) {
      const audio = new Audio('/success.mp3')
      audio.play().catch(error => console.error("Error playing sound:", error))
    }
  }, [count])

  return (
    <>
      <div className="gradient-bg"></div>
      
      <nav>
        <div className="logo">
          <img src={pwaLogo} alt="PWA Logo" />
          <span>ModernPWA</span>
        </div>
        <div className="nav-links">
          <a href="#" className="btn-primary">Get Started</a>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <h1 className="hero-title text-gradient">
            Build Future-Ready <br /> Progressive Apps
          </h1>
          <p className="hero-subtitle">
            Experience the power of modern web technologies. Fast, reliable, and installable on any device.
          </p>
          <div className="hero-actions">
            <button 
              className="btn-primary" 
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
            <p>Optimized with Vite 8 for the best developer and user experience possible.</p>
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
