// https://zod.dev/api?id=preprocess
// Possibly can contribute to zod by creating a .empty option
// on a string that automatically allows strings to be empty.
export const emptyStringToUndefined = (val: unknown) => {
  if (typeof val === "string") {
    return val === "" ? undefined : val;
  }
  return val;
};