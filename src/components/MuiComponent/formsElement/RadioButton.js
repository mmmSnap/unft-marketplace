import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";

export default function RowRadioButtonsGroup(props) {
  const { addressType,fieldName, label, control,setAddType } = props;

  const displayRadioGroup = addressType.map((items) => {
    return (
      <FormControlLabel
        value={items.label}
        control={<Radio />}
        label={items.label}
      />
    );
  });

  return (
    <Controller
      name={fieldName}
      control={control}
      rules= {{
        required: {
            value: true,
            message: "This field is require",
          }
      }}
      render={({field}) => {
        return (
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              {label}
            </FormLabel>
            <RadioGroup
            
              row
              {...field}
              value={field.value}
              onChange={(value)=>{
                setAddType(value.target.value)
                field.onChange(value.target.value)
              }}
            >
              {displayRadioGroup}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
}
