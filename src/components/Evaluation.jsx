import { Paper, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

const Evaluation = ({ evaluation }) => {
  return (
    <Paper elevation={3} sx={{ padding: 1 }}>
      <Stack direction={"column"}>
        <Typography variant="subtitle1" fontWeight={700}>
          {evaluation.nom + " " + evaluation.prenom}
        </Typography>
        <Typography variant="caption">
          {new Date(evaluation.date).getUTCDate() +
            "/" +
            (new Date(evaluation.date).getUTCMonth() + 1) +
            "/" +
            new Date(evaluation.date).getUTCFullYear()}
        </Typography>
        <Rating value={evaluation.nbretoiles} readOnly size="small" />
        <Typography
          width="1"
          variant="body1"
          sx={{
            overflowWrap: "break-word",
          }}
        >
          {evaluation.contenu}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Evaluation;
