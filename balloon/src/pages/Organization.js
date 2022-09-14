import { Container, margin } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { findUnitList, findUnitByUnitId } from '../context/UnitAxios';
import '../css/Organization.css';

function Organization() {
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState([]);
  const [childUnits1, setChildUnits1] = useState([]);
  const [childUnits2, setChildUnits2] = useState([]);

  useEffect(() => {
    if (units.length === 0) {
      findUnitList(setUnits);
    } else {
      console.log(units[0].unitName);
      console.log(units);
    }
  }, [units]);

  // useEffect(() => {
  //   console.log(unit);
  //   if (!!unit.childUnits) {
  //     unit.childUnits.map((unit) => {
  //       console.log('childUnits1');
  //       setChildUnits1(...childUnits1, unit.unitCode);
  //       return childUnits1;
  //     });
  //   }
  // }, [unit]);

  // useEffect(() => {
  //   console.log(childUnits1);
  //   if (!!unit.childUnits) {
  //     // setChildUnits1(unit.childUnits);
  //     unit.childUnits.map((unit) => {
  //       console.log(unit);
  //       setChildUnits1([...childUnits1, unit.unitCode]);
  //     });
  //   }
  //   console.log(childUnits2);
  // }, []);

  // return (
  //   <div>
  //     {units.length !== 0 && units ? (
  //       <div className="thisflex">
  //         {/* <ol style={{ border: '1px solid green', margin: '10px' }}> */}
  //         <ol className="level-1 rectangle">
  //           <h1 className="level-1 rectangle"> {units.unitName}</h1>
  //           {/* <li className="level-2 rectangle">{units.bell}</li> */}
  //           <br /> {/* 구분자 br */}
  //           <li>{units.childUnits !== 0 && ChildUnits(units)}</li>
  //         </ol>
  //       </div>
  //     ) : (
  //       <p>아직 조직이 없습니다.</p>
  //     )}
  //   </div>
  // );

  const str1 = 'level-';
  let num = 1;
  const str2 = ' rectangle';
  return (
    <>
      {units.length && (
        <>
          <h1 className={str1 + num + str2}></h1>
          {units.map((unit) => {
            return (
              unit.parentUnit && (
                <ol className={str1 + (num + 1) + str2}>
                  <li>dd</li>
                </ol>
              )
            );
          })}
        </>
      )}

      {units.length && (
        <Container className="con">
          <h1 className={str1 + num + str2}>{units[0].unitName}</h1>
          <ol className="level-2-wrapper">
            <li>
              <h2 className="level-2 rectangle">{units[1].unitName}</h2>
              <ol className="level-3-wrapper">
                <li>
                  <h3 className="level-3 rectangle">{units[2].unitName}</h3>
                </li>
              </ol>
            </li>
            <li>
              <h2 className="level-2 rectangle">{units[3].unitName}</h2>
              <ol className="level-3-wrapper">
                <li>
                  <h3 className="level-3 rectangle">{units[4].unitName}</h3>
                </li>
              </ol>
            </li>
            <li>
              <h2 className="level-2 rectangle">{units[5].unitName}</h2>
              <ol className="level-3-1-wrapper">
                <li>
                  <h3 className="level-3-1 rectangle">{units[6].unitName}</h3>
                </li>
                <li>
                  <h3 className="level-3-1 rectangle">{units[7].unitName}</h3>
                </li>
                <li>
                  <h3 className="level-3-1 rectangle">{units[8].unitName}</h3>
                </li>
                <li>
                  <h3 className="level-3-1 rectangle">{units[9].unitName}</h3>
                </li>
              </ol>
            </li>
          </ol>
        </Container>
      )}
    </>
  );
}

export default Organization;
