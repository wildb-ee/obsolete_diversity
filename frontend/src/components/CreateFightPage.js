import React, { Component } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { textAlign } from "@mui/system";

import Cookies from "js-cookie";

export default class CreateFightPage extends Component {
  
  defaultVotes = 2
  
  constructor(props) {
    super(props);
    this.state = {
      guestChoseRanked: true,
      votesToSkip: this.defaultVotes,
    };

    this.handleFightButtonPressed = this.handleFightButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleChosenRankedOrUnranked = this.handleChosenRankedOrUnranked.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleChosenRankedOrUnranked(e) {
    this.setState({
      guestChoseRanked: e.target.value === "true" ? true : false,
    })
  }

  // GET TOKEN FROM js-cookies lib
  csrftoken = Cookies.get('csrftoken')

  handleFightButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.csrftoken,
      },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_chose_ranked: this.state.guestChoseRanked
      }),
    };
    fetch("/api/create-fight", requestOptions)
    .then((response) => response.json())
    .then((data) => this.props.history.push("/fight/" + data.code)
    );
  }

  render() {
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
              <div align="center">Choose the mode</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={this.handleChosenRankedOrUnranked}>
              <FormControlLabel 
              value="true" 
              control={<Radio color="primary"/>}
              label="Ranked"
              labelPlacement="bottom"
              />
              <FormControlLabel 
              value="false" 
              control={<Radio color="secondary"/>}
              label="Unranked"
              labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} align="center">
          <FormControl>
            <TextField 
            required={true} 
            type="number"
            onChange={this.handleVotesChange} 
            defaultValue={this.defaultVotes} 
            inputProps={{min: 1,
            style: { textAlign: "center" }
            }}
            />
            <FormHelperText>
              <div align="center">
                Votes required to skip
              </div>
            </FormHelperText>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" onClick={this.handleFightButtonPressed}>Fight!</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    );
  }
}
