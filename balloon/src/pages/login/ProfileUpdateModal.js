import { Modal } from '@mui/material';
import React from 'react';

export function ProfileUpdateModal({ open, setOpen }) {
  return (
    <div>
      <Modal open={open}></Modal>
    </div>
  );
}
