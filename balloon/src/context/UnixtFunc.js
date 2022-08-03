import React from 'react';

export const ChildUnits = (unit) => {
  return (
    <>
      {unit.childUnits.map((unit) => {
        return (
          <div
            style={{ border: '1px solid blue', margin: '5px' }}
            key={unit.unitCode}>
            <p>{unit.unitName}</p>
            <p>{unit.bell}</p>
            <br /> {/* 구분자 br */}
            {unit.childUnits.length !== 0 && ChildUnits(unit)}
          </div>
        );
      })}
    </>
  );
};
