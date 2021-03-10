export default function validate(values) {
  let errors = {};

  if (!values.email) {
    errors.email = { code: "email", message: "Email required" };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = { code: "email", message: "Email addres is invalid" };
  }

  if (!values.password) {
    errors.password = { code: "password", message: "Password is required" };
  } else if (values.password.length < 6) {
    errors.password = {
      code: "password",
      message: "Password needs to be 6 characters or more",
    };
  }

  if (Object.keys(errors).length === 0) {
    return null;
  }
  return errors;
}
