import { Container, margin } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { findUnitList, findUnitByUnitId } from '../context/UnitAxios';
import '../css/Organization.css';

function Organization() {
  const [units, setUnits] = useState([]);
  const [prior1, setPrior1] = useState([]);
  const [prior2, setPrior2] = useState([]);
  const [prior3, setPrior3] = useState([]);

  useEffect(() => {
    if (units.length === 0) {
      findUnitList(setUnits);
    } else {
      setPrior1(units.filter((unit) => unit.prior === 1));
      setPrior2(units.filter((unit) => unit.prior === 2));
      setPrior3(units.filter((unit) => unit.prior === 3));
    }
  }, [units.length]);

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
      {/* {units.length && (
        <>
          <h1 className={str1 + num + str2}></h1>
          {units.map((unit) => {
            return (
              unit?.parentUnit && (
                <ol className={str1 + (num + 1) + str2}>
                  <li>dd</li>
                </ol>
              )
            );
          })}
        </>
      )} */}
      {/* <h1 className={str1 + unit.prior + str2}>조직도</h1>
      {units.length &&
        units.map((unit) => {
          return (
            <div>
              <p>{unit.unitName}</p>
            </div>
          );
        })} */}
      {units.length && (
        <Container className="con">
          {prior1.length !== 0 && (
            <div className={'level-1-wrapper'}>
              <h1 className={str1 + prior1[0].prior + str2}>
                {prior1[0].unitName}
              </h1>
              <div
                style={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  // width: '500px',
                }}>
                {prior2.length !== 0 &&
                  prior2.map((unit2, index2) => {
                    return (
                      <ol
                        key={index2}
                        className={`level-${unit2.prior}-wrapper`}>
                        <li style={{ width: '200px' }}>
                          <h2
                            className={`level-${unit2.prior}-rectangle`}
                            style={{
                              height: '50px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {unit2.unitName}
                          </h2>
                          {prior3.length !== 0 &&
                            prior3.map((unit3, index3) => {
                              if (
                                unit2.unitCode === unit3.parentUnit.unitCode
                              ) {
                                return (
                                  <ol
                                    key={index3}
                                    className={`level-${unit3.prior}-wrapper`}>
                                    <li
                                      style={{
                                        marginTop: '25px',
                                        width: '200px',
                                      }}>
                                      <h3
                                        className={`level-${unit3.prior}-rectangle`}
                                        style={{
                                          height: '50px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}>
                                        {unit3.unitName}
                                      </h3>
                                    </li>
                                  </ol>
                                );
                              }
                            })}
                        </li>
                      </ol>
                    );
                  })}
              </div>
            </div>
          )}
        </Container>
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
