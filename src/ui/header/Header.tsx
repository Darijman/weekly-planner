import { useState } from 'react';
import { Toggle } from '../../components/toggle/Toggle';
import { useThemeStore } from '../../stores/useThemeStore/useThemeStore';
import { useWeeksStore } from '../../stores/useWeeksStore/useWeeksStore';
import { Week } from '../../interfaces/Week';
import { getNextMonday } from '../../helpFunctions/getNextMonday';
import { nanoid } from 'nanoid';
import './header.css';

export const Header = () => {
  const { isDark, toggleDarkMode } = useThemeStore();
  const { currentWeek, setCurrentWeek, weeks, setWeeks } = useWeeksStore();
  const [successMessage, setSuccessMessage] = useState('');

  const addNewWeekHandler = () => {
    const currentStartDate = new Date(currentWeek.weekStartDate);
    if (isNaN(currentStartDate.getTime())) {
      return;
    }

    const nextWeekStartDate = getNextMonday(currentStartDate);
    const nextWeekEndDate = new Date(nextWeekStartDate);
    nextWeekEndDate.setDate(nextWeekStartDate.getDate() + 6);

    const newWeek: Week = {
      id: nanoid(),
      weekStartDate: nextWeekStartDate,
      weekEndDate: nextWeekEndDate,
      days: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    };

    setWeeks([...weeks, newWeek]);
    setCurrentWeek(newWeek);
    setSuccessMessage('✓');

    setTimeout(() => {
      setSuccessMessage('');
    }, 1000);
  };

  return (
    <div className='header_background'>
      <header className='header'>
        <a href='/' className='header_link'>
          <h2 className='header_title'>Weekly Planner</h2>
        </a>
        <nav>
          <ul className='header_list'>
            <li className='header_list_item'>
              <label style={{ cursor: 'pointer' }}>
                <button className='add_new_week_button' onClick={addNewWeekHandler}>
                  + Next Week
                </button>
                {successMessage && <div className='success-message'>{successMessage}</div>}
              </label>
            </li>
            <li className='header_list_toggle'>
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
