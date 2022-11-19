const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const checkInput = ({ email, password }, setError) => {
  
  if (email === "" && password === "") {
    setError("Please enter email, password");
    return false;
  } else if (email === "" && password !== "") {
    setError("Please enter email");
    return false;
  } else if (email !== "" && password === "") {
    setError("Please enter password");
    return false;
  } else if (!validateEmail(email)) {
    setError("Invalid Email");
    return false;
  }
  setError("");
  return true;
};
