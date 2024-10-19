import { useThemeStore } from './stores/useThemeStore/useThemeStore';
import { Header } from './ui/header/Header';
import { WeekGrid } from './components/weekGrid/WeekGrid';
import './app.css';

function App() {
  const { isDark } = useThemeStore();

  return (
    <div className='app' data-theme={isDark ? 'dark' : 'light'}>
      <Header />
      <div className='main'>
        <WeekGrid />
      </div>
    </div>
  );
}

export default App;
