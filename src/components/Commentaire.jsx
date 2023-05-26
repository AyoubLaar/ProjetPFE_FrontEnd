import { Stack, Typography } from "@mui/material";

const Commentaire = ({ membre, contenu, datePub }) => {
  return (
    <Stack direction="column" gap={0} padding={1}>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Typography variant="subtitle1" fontWeight={700}>
          {membre.nom + " " + membre.prenom}
        </Typography>
        <Typography variant="subtitle1">
          {datePub.getDate() +
            "/" +
            datePub.getMonth() +
            "/" +
            datePub.getFullYear()}
        </Typography>
      </Stack>

      <Typography variant="body1">{contenu}</Typography>
    </Stack>
  );
};

export default Commentaire;
