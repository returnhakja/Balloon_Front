import React, { useEffect, useState } from 'react';
import { findUnitList } from '../context/UnitAxios';
import { ChildUnits } from '../context/UnitFunc';

function Organization() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    findUnitList(setUnits);
  }, []);

  return (
    <div>
      {units.length !== 0 && units ? (
        <div style={{ border: '1px solid black', margin: '20px' }}>
          <div style={{ border: '1px solid red', margin: '10px' }}>
            <p>{units.unitName}</p>
            <p>{units.bell}</p>
          </div>
          <br /> {/* 구분자 br */}
          {units.childUnits !== 0 && ChildUnits(units)}
        </div>
      ) : (
        <p>아직 조직이 없습니다.</p>
      )}
    </div>
  );
}

export default Organization;
