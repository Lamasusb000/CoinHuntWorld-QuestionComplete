import React, { Component } from 'react';
import { MoviesData, renderMovieTitle } from './DataLoaders/CoinData';
import Autocomplete from 'react-autocomplete';
import "../components/CSS/AutoComplete.css"
class App extends Component {

  state = { val: '' };

  render() {
    return (
      <div className="autocomplete-wrapper">
        <Autocomplete
          value={this.state.val}
          items={MoviesData()}
          getItemValue={item => item.D}
          shouldItemRender={renderMovieTitle}
          renderMenu={item => (
            <div className="dropdown">
              {item}
            </div>
          )}
          renderItem={(item, isHighlighted) =>
            <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
              {item.C}
            </div>
          }
          onChange={(event, val) => this.setState({ val })}
          onSelect={ val => {this.setState({ val })  } }
        />
      </div>
    );
  }
}

export default App;