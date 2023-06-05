export const TokenIsValid = (jwt) => {
  let isValid = false;
  if (jwt == null) return isValid;
  fetch("http://localhost:8080/api/Auth/VerifyToken", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + jwt,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        isValid = true;
      } else {
        isValid = false;
      }
    })
    .catch((e) => {
      isValid = false;
    });
  return isValid;
};
