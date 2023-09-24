
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export const MuiSearchComponent = ({ search, setSearch }) => {


    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} color='primary' aria-label="search">
                <SearchIcon />
            </IconButton>

        </Paper>
    )
}

export default MuiSearchComponent