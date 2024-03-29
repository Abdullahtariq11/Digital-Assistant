import React from 'react';
import "./Topbar.css";
import Button from 'react-bootstrap/Button';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Topbar() {
  return (
    <div className='top-bar'>
      <TextField
        variant="outlined"
        placeholder="Search Project"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button className='button' variant="outline-info">Add new project</Button>
    </div>
  );
}
