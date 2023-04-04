import React from 'react';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardData: []
    }
  }

  componentDidMount() {
    // fetch the data from your database and update the state
    fetch('/leaderboard')
      .then(response => response.json())
      .then(data => this.setState({ leaderboardData: data }));
  }

  render() {
    const leaderboard = this.state.leaderboardData.map((player, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{player.name}</td>
          <td>{player.score}</td>
        </tr>
      )
    });

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <legend className="f1 fw6 ph0 mh0">Leaderboard</legend>
            <table className="f6 w-100 mw8 center" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 ">Rank</th>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 ">Name</th>
                  <th className="fw6 bb b--black-20 tl pb3 pr3 ">Score</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {leaderboard}
              </tbody>
            </table>
          </div>
        </main>
      </article>
    );
  }
}

export default LeaderBoard;
