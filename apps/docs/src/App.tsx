import { useEffect, useState } from 'react';
import { Landing } from './Landing';
import { Playground } from './Playground';

type View = 'landing' | 'playground';

export function App() {
  const [view, setView] = useState<View>(() => readViewFromHash());

  useEffect(() => {
    window.history.replaceState(null, '', view === 'playground' ? '#/playground' : '#/');
  }, [view]);

  useEffect(() => {
    const onHashChange = () => setView(readViewFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (view === 'landing') {
    return <Landing onBrowse={() => setView('playground')} />;
  }
  return <Playground onBack={() => setView('landing')} />;
}

function readViewFromHash(): View {
  if (typeof window === 'undefined') return 'landing';
  return window.location.hash.startsWith('#/playground') ? 'playground' : 'landing';
}
