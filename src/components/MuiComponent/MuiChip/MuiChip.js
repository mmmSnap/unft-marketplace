import React from 'react'
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
const MuiChip = ({ chipList, setChipList }) => {


    return (
        chipList.map((chip) => {
            return <Chip key={chip.id} label={chip.label} color={chip.isSelected ? 'primary' : 'default'}
                 sx={{margin:"0px 10px",fontSize:"16px"}}
                 size={'string'}
                clickable
                onClick={() => setChipList(chip.id)}
                icon={chip.isSelected?(<CheckIcon />):('')}
            />
        })
    )

}

export default MuiChip