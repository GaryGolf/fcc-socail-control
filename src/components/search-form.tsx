import * as React from 'react';
import * as styles from './search-form.css';

interface Props {
  disabled: boolean;
  onSubmit:(url:string) => void;
}
interface State {
  url: string;
}

export default class SearchForm extends React.PureComponent<Props, State> {
  
  constructor(props:Props) {
    super(props)
    this.state = { url: 'https://www.ebay.com.au/usr/twiz911' };
  }

  private handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const url = event.currentTarget.value;
    this.setState({ url });
  }
  
  private handleFormSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    this.props.onSubmit(this.state.url);
  }

  render() {
    const { disabled } =this.props;
    return (
      <form className={styles.form} onSubmit={this.handleFormSubmit}>
        <input
          className={styles.input}
          //type="text"
          disabled={disabled}
          value={this.state.url}
          onChange={this.handleInputChange}
        />
        <input type="submit" disabled={disabled}/> 
      </form>
    )
  }
}
