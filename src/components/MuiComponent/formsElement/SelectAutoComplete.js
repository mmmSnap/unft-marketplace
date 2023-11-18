import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

export default function SelectAutoComplete(props) {
  const { control, options, fieldName,defaultValue } = props;
    const apiValue = defaultValue?{ label: defaultValue }:null
  return (
    <Controller
      control={control}
      name={fieldName}
      defaultValue={apiValue}
      rules={{
        required: {
          value: true,
          message: "This fields is required",
        },
      }}
      render={({ field, fieldState: { error } }) => {
        return (
          <Autocomplete
            {...field}
            autoHighlight
            getOptionLabel={(option) => option.label}
            //   defaultValue={'male'}
            options={options}
            onChange={(_, data) => {
              field.onChange(data || null);
            }}
            filterOptions={createFilterOptions({matchFrom: 'start'})}
            renderInput={(params) => (
              <TextField
                {...params}
                label={fieldName || ""}
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
