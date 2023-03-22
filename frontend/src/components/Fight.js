import React, { Component } from 'react';

export default class Fight extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestChoseRanked: false,
            isHost: false,
        };
        this.fightCode = this.props.match.params.fightCode;
        this.getFightDetails();
    }

    getFightDetails() {
        fetch('/api/get-fight' + '?code=' + this.fightCode).then((response) => 
            response.json()
        ).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestChoseRanked: data.guest_chose_ranked,
                isHost: data.is_host,
            });
        });
    }

    render() {
        return (
            <div>
                <h3>{this.fightCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>guestChoseRanked: {this.state.guestChoseRanked.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}