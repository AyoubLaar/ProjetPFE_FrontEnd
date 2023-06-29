import Commentaire from "./Commentaire";
import CommentaireForm from "./CommentaireForm";
import { Stack } from "@mui/material";

const ListCommentaire = ({ commentaires }) => {
  return (
    <Stack direction="column">
      <CommentaireForm />
      <Stack direction="column" gap={1}>
        {commentaires.map((commentaire) => (
          <Commentaire
            membre={commentaire.membre}
            contenu={commentaire.contenu}
            datePub={commentaire.datePub}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default ListCommentaire;
