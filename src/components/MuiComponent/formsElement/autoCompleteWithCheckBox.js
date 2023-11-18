import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller } from "react-hook-form";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AutoCompleteWitCheckBox(props) {
//   console.log("test-props", props);
  const { options, control, fieldName,size='medium' } = props;
  return (
    <Controller
      control={control}
      name={fieldName}
      //   defaultValue={apiValue}
      rules={{
        required: {
          value: true,
          message: "This fields is required",
        },
      }}
      render={({ field, fieldState: { error } }) => {
        console.log(field)
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
                placeholder="Select your skills"
                error={error}
                helperText={error ? error.message : ""}
                variant="standard"
              />
            )}
          />
        );
      }}
    />
  );
}
