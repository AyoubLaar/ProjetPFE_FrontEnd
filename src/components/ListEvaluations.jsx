import Evaluation from "./Evaluation.jsx";
import { Stack } from "@mui/material";

const ListEvaluations = ({ evaluations }) => {
  return (
    <Stack direction="column">
      <Stack direction="column" gap={1}>
        {evaluations.map((evaluation) => (
          <Evaluation evaluation={evaluation} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ListEvaluations;
