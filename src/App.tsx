import { Toggle } from './components/toggle/Toggle';
import { useThemeStore } from './stores/useThemeStore/useThemeStore';
import './App.css';

function App() {
  const { isDark, toggleDarkMode } = useThemeStore();

  return (
    <div className='App' data-theme={isDark ? 'dark' : 'light'}>
      <Toggle isChecked={isDark} handleChange={toggleDarkMode} />
      <h1 className='title'>Hello world!</h1>
      <div className='box'>
        <h2>This is a box</h2>
      </div>
    </div>
  );
}

export default App;
