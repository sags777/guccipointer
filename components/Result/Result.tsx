import { useStore } from "@/store/StoreProvider/StoreProvider";
import withStore from "@/store/StoreProvider/withStore";
import {
  calculateAveragePoints,
  createResultData,
  findMostCommonPoint,
} from "@/utilities/commonUtils";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ResultContainer = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: "1px solid grey",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    borderRadius: "5px",
    maxWidth: "380px",
    padding: "10px 10px",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "25px",
  };
});
const TableTitle = styled(TableCell)(() => {
  return {
    fontSize: "20px",
  };
});

const TitleAlert = styled(Box)(() => ({
  marginBottom: 10,
}));

const VoteTableContainer = styled(TableContainer)(() => ({
  marginTop: 10,
  marginBottom: 10,
}));

const ResultTableRow = styled(TableRow)(() => ({
  "&:last-child th, &:last-child td": {
    borderBottom: "none",
  },
}));

const VotersTableCell = styled(TableCell)(() => ({
  padding: "8px",
}));

const VotersChip = styled(Chip)(() => ({
  margin: "5px 5px",
  height: "25px",
}));

const PointsChip = styled(Chip)(() => ({
  margin: "5px 5px",
  height: "20px",
}));

function Result() {
  const store = useStore();
  const { voterData, votesHidden } = store.mainStore.getStore();

  const averagePoints = calculateAveragePoints(voterData);
  const mostCommonPoint = findMostCommonPoint(voterData);
  const resultData = createResultData(voterData);

  const router = useRouter();
  const isFloating = router.asPath === "/floatingpointer";

  if (isFloating || votesHidden) {
    return null;
  }

  return (
    <ResultContainer>
      <TitleAlert>
        <Typography variant="h5">Results</Typography>
      </TitleAlert>
      <Typography variant="subtitle1">
        Average Points: <PointsChip color="info" label={averagePoints} />
      </Typography>
      <Typography variant="subtitle1">
        Most Common Point: <PointsChip color="info" label={mostCommonPoint} />
      </Typography>

      <VoteTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableTitle align="center">Point</TableTitle>
              <TableTitle align="center">Votes</TableTitle>
              <TableTitle align="center">Voters</TableTitle>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultData.map((row) => (
              <ResultTableRow key={row.point}>
                <TableCell component="th" scope="row" align="center">
                  {row.point}
                </TableCell>
                <TableCell align="center">{row.votes}</TableCell>
                <VotersTableCell align="center">
                  {row.voters.map((item, index) => {
                    return (
                      <VotersChip color="success" key={index} label={item} />
                    );
                  })}
                </VotersTableCell>
              </ResultTableRow>
            ))}
          </TableBody>
        </Table>
      </VoteTableContainer>
    </ResultContainer>
  );
}
export default withStore(Result);
