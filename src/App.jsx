import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }
  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    var accessToken = 'BQC3Rgnc_JX22vMuF32XK_Mz9sBdOjuVP21zOWRafPS3B76E6VILEmFI2M1lF0JO_2dwF6prwf81R21Bq3t1mCzCk7MnQB-XjTrViHZJ3h0r7AVsYU318bhiXbj-tQJocjbWApoZxMV40nyhv8wLyoIXQN2Fyr0mU65Hmm49Y2sGEdiyOg&refresh_token=AQACZDNXnzbITPiwd1WOqdME8mWwNqgMkYKug8Hrij7hglSoaE8kcClVg04Sz6KkCScSfho_-mn30BJZSJT9iGzMobpQk3Bdo2Z9MJhxcLAQGf3PnCHyqVomHM0YSA_2HUs'

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks:', json);
        const { tracks } = json;
        this.setState({tracks});
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }

      </div>
    )
  }
}

export default App;
