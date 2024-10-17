import { useThemeStore } from './stores/useThemeStore/useThemeStore';
import { Header } from './ui/header/Header';
import './app.css';

function App() {
  const { isDark } = useThemeStore();

  return (
    <div className='app' data-theme={isDark ? 'dark' : 'light'}>
      <Header />
      <div className='main'>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
        <div className='box'>
          <h2>This is a box</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
