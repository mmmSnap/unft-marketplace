export const ALPHANUMERIC_CHARACTER_REGEX = /^\s*\w+\s*$|^\s*$/;
export const NONZERO_INTEGER_REGEX = /^\s*[1-9]\d*\s*$/;
export const INTEGER_REGEX = /^\s*\d+\s*$/;
export const UUID_REGEX =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const ALPHANUMERIC_CHARACTER_DASH_REGEX = /^[a-zA-Z0-9\- ]*$/;

export const ALPHANUMERIC_SPECIAL_CHARACTER_DASH_AND_COMMMA_REGEX =
  /^[a-zA-Z0-9,\- ]*$/;