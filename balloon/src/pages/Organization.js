import { Container, margin } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { findUnitList } from '../context/UnitAxios';
import { ChildUnits } from '../context/UnitFunc';
import '../css/Organization.css';

function Organization() {
  // const [units, setUnits] = useState([]);

  // useEffect(() => {
  //   findUnitList(setUnits);
  // }, []);

  // return (
  //   <div>
  //     {units.length !== 0 && units ? (
  //       <div class="thisflex">
  //         {/* <ol style={{ border: '1px solid green', margin: '10px' }}> */}
  //         <ol class="level-1 rectangle">
  //           <h1 class="level-1 rectangle"> {units.unitName}</h1>
  //           {/* <li class="level-2 rectangle">{units.bell}</li> */}
  //           <br /> {/* 구분자 br */}
  //           <li>{units.childUnits !== 0 && ChildUnits(units)}</li>
  //         </ol>
  //       </div>
  //     ) : (
  //       <p>아직 조직이 없습니다.</p>
  //     )}
  //   </div>
  // );
  return (
    <Container class="con">
      <h1 class="level-1 rectangle">대표이사실</h1>

      <ol class="level-2-wrapper">
        <li>
          <h2 class="level-2 rectangle">인사부</h2>
          <ol class="level-3-wrapper">
            <li>
              <h3 class="level-3 rectangle">관리팀</h3>
            </li>
          </ol>
        </li>
        <li>
          <h2 class="level-2 rectangle">기획실</h2>
          <ol class="level-3-wrapper">
            <li>
              <h3 class="level-3 rectangle">마케팅팀</h3>
            </li>
          </ol>
        </li>
        <li>
          <h2 class="level-2 rectangle">시스템개발부</h2>
          <ol class="level-3-1-wrapper">
            <li>
              <h3 class="level-3-1 rectangle">기획팀</h3>
            </li>
            <li>
              <h3 class="level-3-1 rectangle">개발팀</h3>
              <ol class="level-4-wrapper">
                <li>
                  <h4 class="level-4 rectangle">개발1팀</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">개발2팀</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">개발3팀</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">개발4팀</h4>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
    </Container>
  );
}

export default Organization;
