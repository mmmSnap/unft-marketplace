import React from 'react';
import style from './RadioButton.module.sass'

const RadioButton = ({ label, checked, onChange }) => {
  return (
    <div className={style.radioButton}>
      <input
        type="radio"
        id={label}
        name="radio-group"
        value={label}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};


export default RadioButton;
