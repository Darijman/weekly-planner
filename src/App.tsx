import { useThemeStore } from './stores/useThemeStore/useThemeStore';
import { Header } from './ui/header/Header';
import { WeekGrid } from './components/weekGrid/WeekGrid';
import './app.css';

const task = {
  id: '1',
  title: 'Do the Math',
  scheduledTime: '12:50PM',
  finished: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

function App() {
  const { isDark } = useThemeStore();

  return (
    <div className='app' data-theme={isDark ? 'dark' : 'light'}>
      <Header />
      <div className='main'>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div>
          <WeekGrid />
        </div>
      </div>
    </div>
  );
}

export default App;
