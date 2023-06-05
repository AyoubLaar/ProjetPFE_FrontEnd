import { Stack, Typography } from "@mui/material";

const Commentaire = ({ membre, contenu, datePub }) => {
  return (
    <Stack direction="column" gap={0} padding={1}>
      <Stack direction="column" flexWrap="wrap">
        <Typography variant="subtitle1" fontWeight={700}>
          {membre.nom + " " + membre.prenom}
        </Typography>
        <Typography variant="caption">
          {new Date(datePub).getDay() +
            "/" +
            new Date(datePub).getMonth() +
            "/" +
            new Date(datePub).getFullYear() +
            "  " +
            `${new Date(datePub).getHours()}:${new Date(
              datePub
            ).getMinutes()}:${new Date(datePub).getSeconds()}`}
        </Typography>
      </Stack>
      <Typography variant="body1">{contenu}</Typography>
    </Stack>
  );
};

export default Commentaire;
