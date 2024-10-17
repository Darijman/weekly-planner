import React from 'react';
import { ReactComponent as Sun } from '../.././svg/Sun.svg';
import { ReactComponent as Moon } from '../.././svg/Moon.svg';
import './toggle.css';

interface Props {
  handleChange: React.ChangeEventHandler;
  isChecked: boolean;
}

export const Toggle = ({ handleChange, isChecked }: Props) => {
  return (
    <div className='dark_mode'>
      <input className='dark_mode_input' type='checkbox' id='darkmode-toggle' onChange={handleChange} checked={isChecked} />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>
  );
};
