import CircularGallery from './components/CircularGallery'

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* 400×400 relative container — shared by text and gallery */}
      <div
        style={{
          position: 'relative',
          width: '500px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 1. BACKGROUND TEXT (z-index 0) */}
        <div
          style={{
            position: 'absolute',
            top: '60%', // Further increased separation for background line
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '6rem', // Further reduced for airy feel
            fontWeight: '900',
            color: '#000',
            textAlign: 'center',
            lineHeight: '1',
            zIndex: 0,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          2025
        </div>

        {/* 2. IMAGE LAYER (Middle) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
          }}
        >
          <CircularGallery />
        </div>

        {/* 3. FOREGROUND TEXT (z-index 30) */}
        <div
          style={{
            position: 'absolute',
            top: '40%', // Further increased separation for headline
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '4.1rem', // Further reduced for airy feel
            fontWeight: '900',
            color: '#000',
            textAlign: 'center',
            lineHeight: '1',
            zIndex: 30,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          MEET UP
        </div>
      </div>
    </div>
  )
}

export default App
