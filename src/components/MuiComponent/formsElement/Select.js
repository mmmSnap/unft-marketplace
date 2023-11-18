import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
    PaperProps: {
        style: {
            // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            // width: 250,
        },
    },
};

const names = [
    'Studio Address',
    'Personal Address',

];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            
            <FormControl   fullwidth={'true'}>
                <InputLabel id="demo-simple-select-label">Select Address</InputLabel>
                <Select
                      fullwidth={'true'}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    //   multiple
                    value={personName}
                    label="Select Address"
                    onChange={handleChange}
                    onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue)
                      }}
                    //   input={<OutlinedInput label="Select Address Type" />}
                    MenuProps={MenuProps}
                    size="small"
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    );
}