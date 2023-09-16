import { useForm } from "react-hook-form";
import {
  GENDER,
  EXPERTISE,
  SKILLS,
  PRICE,
  FLAT_HOUSE_NO,
  AREA_STREET,
  PRICE_VALUE,
  RATING,
  WITH_OR_WITOUT_STUDIO,
} from "../../../GlobalConst/consts";

const Gender = [{ label: "Male" }, { label: "Female" }];

const Skills = [{ label: "Photography" }, { label: "Videography" }];
const Expertise = [
  { label: "Travel" },
  { label: "Wedding" },
  { label: "Events" },
  { label: "Fashion" },
  { label: "Commercial (Brand etc)" },
];
const Price = [{ label: "Hourly" }, { label: "Full day (8 hours)" }];
const WithOrWithoutStudio = [
  { label: "With Studio" },
  { label: "Without Studio" },
];
const Rating = [
  { label: "5" },
  { label: "4" },
  { label: "3" },
  { label: "2" },
  { label: "1" },
];
const useFilter = (data) => {
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      ...data,
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;
  const genderError = errors[GENDER]?.message;
  const priceValueError = errors[PRICE]?.message;
  const flatHouseNoError = errors[FLAT_HOUSE_NO]?.message;
  const areaStreetError = errors[AREA_STREET]?.message;

  const fieldsForm = {
    [GENDER]: {
      // required: true,
      fieldName: GENDER,
      control,
      options: Gender,
      isError: !!genderError,
      errorMessage: genderError,
    },
    [SKILLS]: {
      // required: true,
      fieldName: SKILLS,
      label: "skills",
      control,
      options: Skills,
      isError: !!genderError,
      errorMessage: genderError,
    },
    [EXPERTISE]: {
      // required: true,
      label: "expertise",
      fieldName: EXPERTISE,
      control,
      options: Expertise,
    },
    [PRICE]: {
      // required: true,
      label: "skills",
      fieldName: PRICE,
      control,
      options: Price,
    },
    [WITH_OR_WITOUT_STUDIO]: {
      // required: true,
      label: "With/Without Studio",
      fieldName: WITH_OR_WITOUT_STUDIO,
      control,
      options: WithOrWithoutStudio,
    },
    [RATING]: {
      label: "Rating",
      fieldName: RATING,
      control,
      options: Rating,
    },

    [PRICE_VALUE]: {
      type: "number",
      ...register(PRICE_VALUE, {}),
      isError: !!priceValueError,
      errorMessage: priceValueError,
    },
  };
  return {
    fieldsForm,
    form,
  };
};

export default useFilter;