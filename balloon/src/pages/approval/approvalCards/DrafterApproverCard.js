import React from 'react';
import { CardContent, Typography } from '@mui/material';

export const DfCard = ({ drafterName }) => (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        기안자
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        {drafterName}
      </Typography>
    </CardContent>
  </React.Fragment>
);

export const ApCard = ({ approverName }) => (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        결재자
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        {approverName}
      </Typography>
    </CardContent>
  </React.Fragment>
);
