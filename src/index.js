import React from 'react';
import ReactDom from 'react-dom';

import './myStyles.styl'


class App extends React.Component {
  state = {
    CaptainKirkBio: {},
  };

  componentDidMount() {
    this.onGetKirkBio();
  };

  onGetKirkBio = async () => {
    try {
      const result = await fetch('http://stapi.co/api/v1/rest/character/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          title: 'James T. Kirk',
          name: 'James T. Kirk',
        },
      });
      const resultJSON = await result.json();
      const character = resultJSON.characters[0];
      this.setState({ CaptainKirkBio: character });
    } catch (error) {
      console.log('error', error);
    }
  };
  render () {
    const {CaptainKirkBio} = this.state;

    return (
      <div className="app">
        <img alt="header" src="/dist/images/header.jpg" className="app-header"/>
        <p>
          This was a long paragraph to copy so I abbreviated
        </p>
        <p>Shorthanded by Dan H</p>
        <p>- Captain Kirk</p>
        <section>
          {Object.values(CaptainKirkBio).length === 0 ? (
            <p>Loading User Information</p>
          ) : (
            <p style={{ wordBreak: 'break-all'}}>{JSON.stringify(CaptainKirkBio)}</p>
          )}
        </section>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
