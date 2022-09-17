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

  const str1 = 'level-';
  let num = 1;
  const str2 = ' rectangle';
  return (
    <>
      {units.length && (
        <Container className="con">
          {prior1.length !== 0 &&
            prior1.map((unit1, index1) => {
              return (
                <div className={'level-1-wrapper'}>
                  <h1 className={`level-1-rectangle`}>{unit1.unitName}</h1>
                  <div
                    // className={`level-1-div`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
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
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
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
              );
            })}
        </Container>
      )}
    </>
  );
}

export default Organization;
