import { useForm } from "react-hook-form";
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL_ID,
  PHONE_NUMBER,
  SKILLS,
  EXPERTISE,
  PRICE_VALUE,
  PRICE,
  GENDER,
  COUNTRY_CODE,
  DATE_OF_BIRTH,
  ADDRESS_TYPE,
  COUNTRY_LIST,
  FLAT_HOUSE_NO,
  AREA_STREET,
  LAND_MARK,
  PINCODE,
  CITY,
  STATE,
  INSTA_ID,
  STUDIO_NAME,
} from "../consts/consts";
import CountryCode from  '../../../../public/data/countryCode.json'
import CountryList from '../../../../public/data/countryList.json'
import ToastAlert from "../../styledComponent/Alert/ToastAlert";

const Gender = [{ label: "Male" }, { label: "Female" }];
// const CountryCode =[
//   {
//   "name": "Afghanistan",
//   label: "+93",
//   "code": "AF"
//   },
//   {
//   "name": "Aland Islands",
//   label: "+358",
//   "code": "AX"
//   }]

const Skills = [{label:"Photography"}, {label:"Videography"}]
const Expertise = [{label:"Travel"}, {label:"Wedding"}, {label:"Events"}, {label:"Fashion"}, {label:"Commercial (Brand etc)"}]
const Price = [{label:"Hourly"},{label:"Full day (8 hours)"}]

export default function UseProfileForms(data) {
  delete data[GENDER]
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...data,
    },
  });
  const {
    register,
    control,
    formState: { errors },
  } = form;
console.log('test error ',errors)
  const firstNameError = errors[FIRST_NAME]?.message;
  const lastNameError = errors[LAST_NAME]?.message;
  const emailIdError = errors[EMAIL_ID]?.message;
  const phoneNumberError = errors[PHONE_NUMBER]?.message;
  const genderError = errors[GENDER]?.message;
  const priceValueError =  errors[PRICE_VALUE]?.message;
  const flatHouseNoError =  errors[FLAT_HOUSE_NO]?.message;
  const areaStreetError =  errors[AREA_STREET]?.message;
  const landMarkError =  errors[LAND_MARK]?.message;
  const pineCodeError =  errors[PINCODE]?.message;
  const cityError =  errors[CITY]?.message;
  const stateError =  errors[STATE]?.message;
  const instaIdError =  errors[INSTA_ID]?.message;
  const studioNameError =  errors[STUDIO_NAME]?.message;





  // const
  const fieldsForm = {
    [FIRST_NAME]: {
      required: true,
      ...register(FIRST_NAME, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!firstNameError,
      errorMessage: firstNameError,
    },
    [LAST_NAME]: {
      required: true,
      ...register(LAST_NAME, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!lastNameError,
      errorMessage: lastNameError,
    },
    [EMAIL_ID]: {
      required: true,
      ...register(EMAIL_ID, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!emailIdError,
      errorMessage: emailIdError,
    },
    [PHONE_NUMBER]: {
      required: true,
      ...register(PHONE_NUMBER, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!phoneNumberError,
      errorMessage: phoneNumberError,
    },
    [FLAT_HOUSE_NO]: {
      required: true,
      ...register(FLAT_HOUSE_NO, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!flatHouseNoError,
      errorMessage: flatHouseNoError,
    },
    [AREA_STREET]: {
      required: true,
      ...register(AREA_STREET, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!areaStreetError,
      errorMessage: areaStreetError,
    },
    [LAND_MARK]: {
      required: true,
      ...register(LAND_MARK, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!landMarkError,
      errorMessage: landMarkError,
    },
    [PINCODE]: {
      required: true,
      ...register(PINCODE, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!pineCodeError,
      errorMessage: pineCodeError,
    },
    [CITY]: {
      required: true,
      ...register(CITY, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!cityError,
      errorMessage: cityError,
    },
    [STATE]: {
      required: true,
      ...register(STATE, {
        required: {
          value: true,
          message: "This field is required",
        },
      }),
      isError: !!stateError,
      errorMessage: stateError,
    },
    //FLAT_HOUSE_NO AREA_STREET LAND_MARK PINCODE CITY
    [DATE_OF_BIRTH]: {
      required: true,
      // ...register(DATE_OF_BIRTH, {
      //   required: {
      //     value: true,
      //     message: "This field is required",
      //   },
      //   control
      // }),
      fieldName: DATE_OF_BIRTH,
      control
      // isError: !!phoneNumberError,
      // errorMessage: phoneNumberError,
    },
    [COUNTRY_CODE]: {
      required: true,
      fieldName: COUNTRY_CODE,
      control,
      options: CountryCode,
      isError: !!genderError,
      errorMessage: genderError,
    },
    [COUNTRY_LIST]: {
      required: true,
      fieldName: COUNTRY_LIST,
      control,
      options: CountryList,
      isError: !!genderError,
      errorMessage: genderError,
    },
    //COUNTRY_CODE DATE_OF_BIRTH
    [GENDER]: {
      required: true,
      fieldName: GENDER,
      control,
      options: Gender,
      isError: !!genderError,
      errorMessage: genderError,
    },
    [SKILLS]: {
        required: true,
        fieldName: SKILLS,
        label:"skills",
        control,
        options: Skills,
        isError: !!genderError,
        errorMessage: genderError,
      },
      [EXPERTISE]: {
        required: true,
        label:"expertise",
        fieldName: EXPERTISE,
        control,
        options: Expertise,
        isError: !!genderError,
        errorMessage: genderError,
      },
      [PRICE]: {
        required: true,
        label:"skills",
        fieldName: PRICE,
        control,
        options: Price,
        isError: !!genderError,
        errorMessage: genderError,
      },
      [PRICE_VALUE]: {
        required: true,
        type:"number",
        ...register(PRICE_VALUE, {
          required: {
            value: true,
            message: "This field is required",
          },
        }),
        isError: !!priceValueError,
        errorMessage: priceValueError,
      },
      [INSTA_ID]: {
        required: true,
        ...register(INSTA_ID, {
          required: {
            value: true,
            message: "This field is required",
          },
        }),
        isError: !!instaIdError,
        errorMessage: instaIdError,
      },
      [STUDIO_NAME]: {
        required: true,
        ...register(STUDIO_NAME, {
          required: {
            value: true,
            message: "This field is required",
          },
        }),
        isError: !!studioNameError,
        errorMessage: studioNameError,
      },

    //   [PHONE_NUMBER]:{
    //     required:true,
    //     ...register(PHONE_NUMBER,{
    //         required:{
    //             value: true,
    //             message: "Invalid first name fields",
    //         }
    //     }), fieldName: DATA_TYPE_FIELD,
    //   required: true,
    //   options: dataTypeOptions,
    //   control,
    //     isError:!!firstNameError,
    //     errorMessage:firstNameError
    //   }
  };

  return {
    form,
    fieldsForm,
  };
}
