import { Stack, Typography, Paper } from "@mui/material";

const Commentaire = ({ membre, contenu, datePub }) => {
  console.log(datePub);
  return (
    <Paper elevation={3} sx={{ padding: 1 }}>
      <Stack direction="column" gap={0}>
        <Stack direction="column" flexWrap="wrap">
          <Typography variant="subtitle1" fontWeight={700}>
            {membre.nom + " " + membre.prenom}
          </Typography>
          <Typography variant="caption">
            {new Date(datePub).getUTCDate() +
              "/" +
              (new Date(datePub).getUTCMonth() + 1) +
              "/" +
              new Date(datePub).getUTCFullYear()}
          </Typography>
        </Stack>
        <Typography
          width="1"
          variant="body1"
          sx={{
            overflowWrap: "break-word",
          }}
        >
          {contenu}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Commentaire;
