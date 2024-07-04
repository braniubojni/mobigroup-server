const ALREADY_EXISTS = (name: string) => `${name} already exists`;
const NOT_FOUND = (name: string) => `${name} not found`;
const INVALID = (name: string) => `${name} is invalid`;
const REQUIRED_RANGE = (min: number, max: number) =>
  `Length should be bigger than ${min} and lower than ${max}`;
const ONE_OF_ENUM = <T>(obj: T, name: string) =>
  `${name} should be one of (${Object.values(obj).join('|')})`;

export { ALREADY_EXISTS, NOT_FOUND, INVALID, REQUIRED_RANGE, ONE_OF_ENUM };
