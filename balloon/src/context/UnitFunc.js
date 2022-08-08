import React from 'react';
import '../css/Organization.css';

export const ChildUnits = (unit) => {
  return (
    // <div style={{ border: '1px solid blue', margin: '5px' }}>
    <div class="thisflex">
      {unit.childUnits.map((unit) => {
        return (
          <ol
            style={{ border: '1px solid red', margin: '2px' }}
            key={unit.unitCode}
            class="level-3-wrapper">
            <li class="level-3 rectangle">{unit.unitName}</li>
            {/* <li>{unit.bell}</li> */}
            <br /> {/* 구분자 br */}
            {unit.childUnits.length !== 0 && ChildUnits(unit)}
          </ol>
        );
      })}
    </div>
  );
};
