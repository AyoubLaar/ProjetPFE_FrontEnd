const isAuthentified = () => {
  const jwt = window.localStorage.getItem("ESTATE_HUB_JWT");
  console.log(jwt);
  if (jwt == null) return false;

  if (jwt != null) {
    fetch("http://localhost:8080/api/Auth/VerifyToken", {
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP status " + res.status);
        } else {
          return true;
        }
      })
      .catch((e) => {
        console.log("error : " + e);
        return false;
      });
  }
};

export default isAuthentified;
