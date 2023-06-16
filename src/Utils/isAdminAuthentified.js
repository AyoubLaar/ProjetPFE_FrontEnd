const isAdminAuthentified = () => {
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");

  if (jwt == null) return false;

  if (jwt != null) {
    fetch("http://localhost:8080/api/Auth/VerifyTokenAdmin", {
      headers: new Headers({
        Authorization: "Bearer " + jwt,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        } else {
          return true;
        }
      })
      .catch((e) => {
        window.localStorage.removeItem("ESTATE_HUB_JWT");
        return false;
      });
  }
};

export default isAdminAuthentified;
