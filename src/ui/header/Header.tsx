import { Toggle } from '../../components/toggle/Toggle';
import { useThemeStore } from '../../stores/useThemeStore/useThemeStore';
import './header.css';

export const Header = () => {
  const { isDark, toggleDarkMode } = useThemeStore();

  return (
    <div className='header_background'>
      <header className='header'>
        <a href='/' className='header_link'>
          <h2 className='header_title'>Weekly Planner</h2>
        </a>
        <nav>
          <ul className='header_list'>
            <li>
              <label style={{ cursor: 'pointer' }}>
                <button className='add_new_week_button'>+ Next Week</button>
              </label>
            </li>
            <li>
              <label style={{ cursor: 'pointer' }}>
                <Toggle isChecked={isDark} handleChange={toggleDarkMode} />
              </label>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};
