import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';

class searchBar extends React.Component {
  constructor () {
    super();
    this.state = {
      value: ''
    };
  }

  componentDidMount () {

  }

  onChange (value) {
    if (this.timer) clearTimeout(this.timer);
    if (value) {
      if (!value.startsWith('#')) value = '#' + value;

      this.setState({
        value: value
      });

      if (value !== '#') this.timer = setTimeout(this.props.onSearch, 750, value);
    }
  }

  render () {
    return (
      <div>
        <SearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onRequestSearch={this.onChange.bind(this)}
          style={{
            margin: '0 auto',
            maxWidth: 800
          }}
        />
      </div>
    );
  }
}

searchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default searchBar;
