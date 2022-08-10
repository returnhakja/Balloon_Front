import React from 'react';
import '../css/Organization.css';

export const ChildUnits = (unit) => {
  return (
    // <div style={{ border: '1px solid blue', margin: '5px' }}>
    <div class="thisflex">
      {unit.childUnits.map((unit) => {
        return (
          <>
            <ol key={unit.unitCode} class="level-3-wrapper">
              <h3 class="level-4 rectangle">{unit.unitName}</h3>
              {/* <li>{unit.bell}</li> */}
              <br /> {/* 구분자 br */}
            </ol>

            <h3 class="level-4">
              {unit.childUnits.length !== 0 && ChildUnits(unit)}
            </h3>
          </>
        );
      })}
    </div>
  );
};
