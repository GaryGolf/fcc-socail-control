import * as React from 'react';
import * as styles from './search-form.css';

interface Props {}
interface State {
  url: string;
}

export default class SearchForm extends React.PureComponent<Props, State> {
  constructor(props:Props) {
    super(props)
    this.state = { url: '' };
  }

  private handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const url = event.currentTarget.value;
    this.setState({ url });
  }
  
  private handleFormSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    console.log('url:', this.state.url)
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={this.state.url}
            onChange={this.handleInputChange}
          />
          <button>
            Submit
          </button>
        </form>
      </div>
    )
  }
}