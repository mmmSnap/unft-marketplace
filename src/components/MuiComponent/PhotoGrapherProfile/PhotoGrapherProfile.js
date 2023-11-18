

import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  ADDRESS_TYPE,
  AREA_STREET,
  CITY,
  COUNTRY_LIST,
  DATE_OF_BIRTH,
  EMAIL_ID,
  EXPERTISE,
  FIRST_NAME,
  FLAT_HOUSE_NO,
  GENDER,
  LAND_MARK,
  LAST_NAME,
  PHONE_NUMBER,
  PINCODE,
  PRICE,
  PRICE_VALUE,
  SKILLS,
  STATE,
  INSTA_ID,
  STUDIO_NAME,
} from "../consts/consts";
import UseProfileForms from "./UseProfileForms";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import ToastAlert from "../../styledComponent/Alert/ToastAlert";
import { useRouter } from "next/router";
import UserInfo from "./UserInfo";
import AddressTypeComponent from "./AddressTypeComponent";
import OtherSkills from "./OtherSkills";


export default function PhotoGrapherProfile({ data }) {
  const { fieldsForm, form } = UseProfileForms(
    JSON.parse(JSON.stringify(data))
  );
  const { control, getValues, setValue, handleSubmit, trigger } = form;
  const [loading, setLoading] = useState(false);
  const [activeState, setActiveState] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const router = useRouter();
  const getComponentList = () => {
    return (
      <>
        <UserInfo
          fieldsForm={fieldsForm}
          control={control}
          form={form}
          data={data}
        />
        <AddressTypeComponent fieldsForm={fieldsForm} control={control} />
        <OtherSkills fieldsForm={fieldsForm} control={control} />
      </>
    );
  };

  const onSubmitForm = (data) => {
    // window.scrollTo(0, 0)
    setLoading(true);
    const payload = {
      first_name: data[FIRST_NAME],
      last_name: data[LAST_NAME],
      email: data[EMAIL_ID],
      phonenumber: data[PHONE_NUMBER],
      date_of_birth: data[DATE_OF_BIRTH],
      gender: data[GENDER]?.label,
      address_type: data[ADDRESS_TYPE],
      studio_name: data[STUDIO_NAME],
      address: {
        [FLAT_HOUSE_NO]: data[FLAT_HOUSE_NO],
        [AREA_STREET]: data[AREA_STREET],
        [LAND_MARK]: data[LAND_MARK],
      },
      pincode: data[PINCODE],
      city: data[CITY],
      state: data[STATE],
      country: data[COUNTRY_LIST],
      skills: data[SKILLS].map((items) => items.label),
      expertise: data[EXPERTISE].map((items) => items.label),
      price: data[PRICE],
      price_value: data[PRICE_VALUE],
      insta_id: data[INSTA_ID],
    };
    console.log("payload:::", payload);
    axios({
      method: "PATCH",
      url: "/api/user",
      data: { ...payload },
    })
      .then((resp) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setIsOpen(true);
        setMessage("Your profile has been successfully updated.");
        setType("success");
       
        setTimeout(() => {
          setLoading(false);
          // setIsOpen(false)
        }, 1000);
      })
      .catch((e) => {
        setMessage("Your profile has been successfully updated");
        setType("success");
        setIsOpen(true);
        setTimeout(() => {
          setLoading(false);
          // setIsOpen(false)
        }, 1000);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 10 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Grid
          item
          xs={6}
          md={9}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <ToastAlert
                type={type}
                isOpen={isOpen}
                message={message}
                setIsOpen={setIsOpen}
              />
              {getComponentList()}

              <Grid
                container
                spacing={2}
                sx={{ mt: "50px", ml: "5px", mb: "20px" }}
              >
                <Grid tem xs={6} md={3}>
                  <LoadingButton
                    // color="primary"
                    size="large"
                    fullWidth={true}
                    loading={loading}
                    onClick={() => router.push("/photographer/home")}
                    loadingPosition="start"
                    // startIcon={<SaveIcon />}
                    // variant="contained"
                  >
                    Skip
                  </LoadingButton>
                </Grid>

                <Grid tem xs={6} md={3}>
                  <LoadingButton
                    color="primary"
                    type="submit"
                    size="large"
                    fullWidth={true}
                    loading={loading}
                    loadingPosition="start"
                    // startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    <span>Submit</span>
                  </LoadingButton>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
