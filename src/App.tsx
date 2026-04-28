import { useState, type ReactNode } from 'react'
import './App.css'

function SourceCard(props: { title: string; children: ReactNode }) {
  return (
    <article className="card">
      <strong>{props.title}</strong>
      <span>{props.children}</span>
    </article>
  )
}

function App() {
  const [clicks, setClicks] = useState(0)

  return (
    <main className="app">
      <div className="shell">
        <section className="hero">
          <p className="eyebrow">@line-copy-open demo</p>
          <h1>Use Option/Alt inspection to jump from browser UI to React source.</h1>
          <p className="summary">
            This page is intentionally made of several small React components so the
            inspector can show source file, line, and column data injected by
            <code>@line-copy-open/react</code>.
          </p>
        </section>

        <section className="panel">
          <h2>Try it</h2>
          <p>
            Run the dev server, hold <code>Option</code> on macOS or <code>Alt</code> on
            Windows, then hover or long-press a card. Clicking a resolved component opens
            the source through <code>@line-copy-open/vite</code>.
          </p>
          <button className="demo-button" type="button" onClick={() => setClicks(clicks + 1)}>
            Click target: {clicks}
          </button>
        </section>

        <section className="cards" aria-label="Inspectable React cards">
          <SourceCard title="Vite plugin">
            Injects the browser client and handles the local open-editor request.
          </SourceCard>
          <SourceCard title="React plugin">
            Adds debug source metadata before JSX is compiled by the React plugin.
          </SourceCard>
          <SourceCard title="Editor command">
            This demo sets <code>editor: 'code'</code>, so VS Code is used explicitly.
          </SourceCard>
        </section>
      </div>
    </main>
  )
}

export default App
