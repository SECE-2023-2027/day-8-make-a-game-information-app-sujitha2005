'use client';

import { useEffect, useState } from 'react';

type Game = {
  id: number;
  name: string;
  poster: string;
  releaseYear: string;
  developer: string;
  category: string;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  const categories = ['Action', 'Drama', 'History', 'Horror', 'Fantasy'];

  const GameCard = ({ game }: { game: Game }) => {
    const isHovered = hoveredCard === game.id;

    return (
      <div
        onMouseEnter={() => setHoveredCard(game.id)}
        onMouseLeave={() => setHoveredCard(null)}
        style={{
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '1rem',
          padding: '1rem',
          boxShadow: isHovered
            ? '0 10px 30px rgba(0, 0, 0, 0.5)'
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease',
        }}
      >
        <img
          src={game.poster}
          alt={game.name}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            borderRadius: '0.75rem',
            marginBottom: '1rem',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>
          {game.name}
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
          🧑‍💻 {game.developer}
        </p>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
          📅 {game.releaseYear}
        </p>
      </div>
    );
  };

  return (
    <main
      style={{
        background: 'linear-gradient(to right, #1e3a8a, #0f172a)',
        minHeight: '100vh',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#facc15' }}>
          🎮 GameZone
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {['Home', 'About', 'Contact', 'Logout'].map((link) => (
            <a
              key={link}
              style={{
                color: 'white',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#facc15')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              {link}
            </a>
          ))}
          <button
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
          <button
            style={{
              background: '#10b981',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <section style={{ padding: '2rem' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '2rem',
            color: '#fbbf24',
          }}
        >
          🌟 Discover Top Games by Category
        </h1>

        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                marginBottom: '1rem',
                color: '#60a5fa',
              }}
            >
              {cat}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {games
                .filter((g) => g.category === cat)
                .map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
