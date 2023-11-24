import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller } from "react-hook-form";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SelectValueOnChange(props) {
  const { options, control, fieldName,size='medium',filterData, } = props;
  return (
    <Controller
      control={control}
      name={fieldName}
      rules={{
        required: {
          value: false,
          message: "This fields is required",
        },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            multiple
            {...field}
            size={size}
            id="checkboxes-tags-demo"
            options={options||[]}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            onChange={(_, data) => {
                field.onChange(data || null);
                filterData(data,fieldName)
              }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={fieldName}
                variant= "standard"
                placeholder="Select your skills"
                error={error}
                helperText={error ? error.message : ""}
              />
            )}
          />
        );
      }}
    />
  );
}