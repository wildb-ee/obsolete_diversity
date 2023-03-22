import React from "react";
import { Button, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function CreateFightPage(props) {
  const [section, setSection] = React.useState('all');
  let navigate = useNavigate();

  const handleChange = (event) => {
    setSection(event.target.value);
  };

  const handleFightButtonPressed= (events)=> {

    axios.post("/api/create-fight",{section: section})
    .then((response) => {
      
      console.log(response);
      //СДЕЛАЙ ЧТОБЫ ОН ПЕРЕХОДИЛ ПО НУЖНОМУ КОДУ И ЗАХОДИЛ В КОМНАТУ
      navigate('/');
    });

  };

  return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Fight
          </Typography>
        </Grid>


        <Grid item xs={12} align="center">
          <FormControl component={"fieldset"}>
            <FormHelperText>
              <div align="center">Choose the section</div>
            </FormHelperText>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={section}
              label="Section"
              onChange={handleChange}
            >
              <MenuItem value={"math"}>Math</MenuItem>
              <MenuItem value={"reading"}>Reading</MenuItem>
              <MenuItem value={"all"}>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" onClick={handleFightButtonPressed}>Fight!</Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>

      </Grid>

    );
  
}