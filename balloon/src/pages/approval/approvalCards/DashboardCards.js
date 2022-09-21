import React from 'react';
import { Link } from 'react-router-dom';
import { CardActionArea, Card, CardContent, Typography } from '@mui/material';

export const DBCard = ({ link, title, content }) => (
  <Link to={link}>
    <CardActionArea>
      <Card
        variant="outlined"
        sx={{ minWidth: 300, height: 200 }}
        style={{ backgroundColor: '#F1F9FF' }}>
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 25 }}
              color="#00AAFF"
              gutterBottom
              textAlign="center">
              {title}
            </Typography>
            <div style={{ border: '1px solid black' }} />
            <br />
            <Typography
              sx={{ fontSize: 20 }}
              variant="h5"
              component="div"
              textAlign="center">
              {content}
            </Typography>
          </CardContent>
        </React.Fragment>
      </Card>
    </CardActionArea>
  </Link>
);
