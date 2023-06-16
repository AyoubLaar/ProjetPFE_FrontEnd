import { Stack, Typography } from "@mui/material";

const Commentaire = ({ membre, contenu, datePub }) => {
  console.log(datePub);
  return (
    <Stack direction="column" gap={0} padding={1}>
      <Stack direction="column" flexWrap="wrap">
        <Typography variant="subtitle1" fontWeight={700}>
          {membre.nom + " " + membre.prenom}
        </Typography>
        <Typography variant="caption">
          {new Date(datePub).getUTCDate() +
            "/" +
            (new Date(datePub).getUTCMonth() + 1) +
            "/" +
            new Date(datePub).getUTCFullYear() +
            "  " +
            `${new Date(datePub).getUTCHours()}:${new Date(
              datePub
            ).getUTCMinutes()}:${new Date(datePub).getUTCSeconds()}`}
        </Typography>
      </Stack>
      <Typography variant="body1">{contenu}</Typography>
    </Stack>
  );
};

export default Commentaire;
