export const isValid = (form: object, schema: object) => {
  return Object.keys(form)
    .map((key) => {
      const value = (form as any)[key];
      if ((schema as any)[key]) {
        return (schema as any)[key](value);
      }
      return true;
    })
    .every((e) => !!e);
};

export const getValidationInfo = (form: object, schema: object) => {
  const result = {};

  Object.keys(form)
    .forEach((key) => {
      const value = (form as any)[key];
      if ((schema as any)[key]) {
        (result as any)[key] = (schema as any)[key](value);
      } else {
        (result as any)[key] = true;
      }
    })

    return result;
};
