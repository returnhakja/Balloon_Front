import React from 'react';
import '../css/Organization.css';

function Chart() {
  return (
    <div class="con">
      <div class="item">
        <h1 class="level-1 rectangle">CEO</h1>
        {/* <p class="plus"> + </p> */}
      </div>
      <ol class="level-2-wrapper">
        <li>
          <h2 class="level-2 rectangle">기획실</h2>
          <ol class="level-3-wrapper">
            <li>
              <h3 class="level-3 rectangle">마케팅팀</h3>
              <ol class="level-4-wrapper">
                <li>
                  <h4 class="level-4 rectangle">박정인</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">백성준</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">조명윤</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">김용주</h4>
                </li>
              </ol>
            </li>
            <li>
              <h3 class="level-3 rectangle">메신저팀</h3>
              <ol class="level-4-wrapper">
                <li>
                  <h4 class="level-4 rectangle">정영광</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">정영훈</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">곽예영</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">신현채</h4>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          <h2 class="level-2 rectangle">인사부</h2>
          <ol class="level-3-wrapper">
            <li>
              <h3 class="level-3 rectangle">인사부</h3>
              <ol class="level-4-wrapper">
                <li>
                  <h4 class="level-4 rectangle">서의진</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">성종헌</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">김윤호</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">김도헌</h4>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          <h2 class="level-2 rectangle">시스템개발부</h2>
          <ol class="level-3-wrapper">
            <li>
              <h3 class="level-3 rectangle">그룹웨어팀</h3>
              <ol class="level-4-wrapper">
                <li>
                  <h4 class="level-4 rectangle">서의진</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">성종헌</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">김윤호</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">김도헌</h4>
                </li>
              </ol>
            </li>
            <li>
              <h3 class="level-3 rectangle">공장팀</h3>
              <ol class="level-4-wrapper">
                <li>
                  <h4 class="level-4 rectangle">박한주</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">김민규</h4>
                </li>
                <li>
                  <h4 class="level-4 rectangle">강동현</h4>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Chart;
