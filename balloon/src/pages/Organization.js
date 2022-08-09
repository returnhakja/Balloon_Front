import React, { useEffect, useState } from 'react';
import { findUnitList } from '../context/UnitAxios';
import { ChildUnits } from '../context/UnitFunc';
import '../css/Organization.css';

function Organization() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    findUnitList(setUnits);
  }, []);

  return (
    <div>
      {units.length !== 0 && units ? (
        <div class="thisflex">
          {/* <ol style={{ border: '1px solid green', margin: '10px' }}> */}
          <ol class="level-1 rectangle">
            <h1 class="level-1 rectangle"> {units.unitName}</h1>
            {/* <li class="level-2 rectangle">{units.bell}</li> */}
            <br /> {/* 구분자 br */}
            <li>{units.childUnits !== 0 && ChildUnits(units)}</li>
          </ol>
        </div>
      ) : (
        <p>아직 조직이 없습니다.</p>
      )}
    </div>
  );
}

export default Organization;
