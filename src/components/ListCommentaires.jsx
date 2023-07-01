import Commentaire from "./Commentaire";
import CommentaireForm from "./CommentaireForm";
import { Stack } from "@mui/material";

const ListCommentaire = ({ commentaires }) => {
  return (
    <Stack direction="column" gap={3}>
      <CommentaireForm />
      <Stack direction="column" gap={3}>
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
