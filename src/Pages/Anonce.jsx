import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Anonce = () => {
  const id = useParams().id;
  return (
    <>
      <Header />
      Acceuil Anonce {id}
    </>
  );
};

export default Anonce;
