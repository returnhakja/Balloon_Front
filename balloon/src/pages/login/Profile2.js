import React, { useState } from 'react';

function Profile() {
  const region = process.env.REACT_APP_AWS_BUCKET_REGION;
  const bucket = process.env.REACT_APP_AWS_BUCKET_NAME;

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  const handleFileInput = async (e) => {
    const file = e.target.files[0];

    console.log('file', file);
    const file_key = file.name.replace('.png', '');
    // await Api.put(`user/${ownerData._id}`, {
    //   image: ownerData._id,
    // });
    console.log('fileName', file_key);

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket, // 버킷 이름
        Key: file_key + 2 + '.png', // 유저 아이디
        Body: file, // 파일 객체
      },
    });

    const promise = upload.promise();
    promise.then(
      function () {
        // 이미지 업로드 성공
        window.setTimeout(function () {
          window.location.reload();
        }, 2000);
      },
      function (err) {
        // 이미지 업로드 실패
        console.log(err);
      }
    );
  };

  return (
    <>
      <input type="file" onChange={handleFileInput} />
    </>
  );
}

export default Profile;
