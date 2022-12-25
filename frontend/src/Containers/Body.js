import { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@material-ui/core";
import "react-tabs/style/react-tabs.css";

import { useStyles } from "../hooks";
import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const {
    messages,
    queryMessages,
    addCardMessage,
    addRegularMessage,
    addErrorMessage,
    addCardMessagePlus,
    addRegularMessagePlus,
  } = useScoreCard();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState("name");
  const [queryString, setQueryString] = useState("");

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card, messages },
    } = await axios.post("/card", {
      name,
      subject,
      score,
    });
    
    if (!card) addErrorMessage(message, 0);
    else {
      const userInfo = JSON.parse(messages);
      addCardMessagePlus(message, userInfo);}
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get("/cards", {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!messages) addErrorMessage(message, 1);
    else {
      const ms = JSON.parse(messages);
      addRegularMessagePlus(ms);
    }
  };

  const AddRow = (
    <Row>
      <TextField
        className={classes.input}
        placeholder="Name"
        value={name}
        onChange={handleChange(setName)}
      />
      <TextField
        className={classes.input}
        placeholder="Subject"
        style={{ width: 240 }}
        value={subject}
        onChange={handleChange(setSubject)}
      />
      <TextField
        className={classes.input}
        placeholder="Score"
        value={score}
        onChange={handleChange(setScore)}
        type="number"
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={!name || !subject || score === ""}
        onClick={handleAdd}
      >
        Add
      </Button>
    </Row>
  );

  const QueryRow = (
    <Row>
      <StyledFormControl>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={queryType}
            onChange={handleChange(setQueryType)}
          >
            <FormControlLabel
              value="name"
              control={<Radio color="primary" />}
              label="Name"
            />
            <FormControlLabel
              value="subject"
              control={<Radio color="primary" />}
              label="Subject"
            />
          </RadioGroup>
        </FormControl>
      </StyledFormControl>
      <TextField
        placeholder="Query string..."
        value={queryString}
        onChange={handleChange(setQueryString)}
        style={{ flex: 1 }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        disabled={!queryString}
        onClick={handleQuery}
      >
        Query
      </Button>
    </Row>
  );

  return (
    <Wrapper>
      <Tabs>
        <TabList>
          <Tab> ADD </Tab>
          <Tab> Query </Tab>
        </TabList>
        <TabPanel>
          {AddRow}
          <ContentPaper variant="outlined">
            {messages.map((m, i) => {
              if (Array.isArray(m)) {
                return (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right"> Name </TableCell>
                          <TableCell align="right"> Subject </TableCell>
                          <TableCell align="right"> Score </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {m.map((row) => {
                          return (
                            <TableRow key={row._id}>
                              <TableCell align="right"> {row.name} </TableCell>
                              <TableCell align="right">
                                {" "}
                                {row.subject}{" "}
                              </TableCell>
                              <TableCell align="right"> {row.score} </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              } else
                return (
                  <Typography
                    variant="body2"
                    key={m + i}
                    style={{ color: m.color }}
                  >
                    {m.message}
                  </Typography>
                );
            })}
          </ContentPaper>
        </TabPanel>
        <TabPanel>
          {QueryRow}
          <ContentPaper variant="outlined">
            {queryMessages.map((m, i) => {
              if (Array.isArray(m)) {
                return (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right"> Name </TableCell>
                          <TableCell align="right"> Subject </TableCell>
                          <TableCell align="right"> Score </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {m.map((row) => {
                          return (
                            <TableRow key={row._id}>
                              <TableCell align="right"> {row.name} </TableCell>
                              <TableCell align="right">
                                {" "}
                                {row.subject}{" "}
                              </TableCell>
                              <TableCell align="right"> {row.score} </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              } else
                return (
                  <Typography
                    variant="body2"
                    key={m + i}
                    style={{ color: m.color }}
                  >
                    {m.message}
                  </Typography>
                );
            })}
          </ContentPaper>
        </TabPanel>
      </Tabs>
    </Wrapper>
  );
};

export default Body;
