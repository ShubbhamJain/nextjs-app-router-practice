export const prepareResponse = <T>(
  error: boolean,
  message: string,
  data: T
) => {
  return { error, message, data };
};
