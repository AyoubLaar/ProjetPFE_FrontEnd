import Commentaire from "./Commentaire";
import CommentaireForm from "./CommentaireForm";
import { Typography, Stack } from "@mui/material";

const ListCommentaire = ({ commentaires }) => {
  return (
    <Stack direction="column" gap={1}>
      <Typography variant="h5" fontWeight={700}>
        Comments :
      </Typography>
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
