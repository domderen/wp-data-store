import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';

import logo from './logo.svg';
import './App.css';

function App(props) {
  console.log('props', props);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          List: {JSON.stringify(props.list)}
        </p>
        <p>
        Select page:
        {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          new Array(10).fill(0).map((e,i) => <a key={i} onClick={() => props.changePage(i+1)}> {i+1} </a>)
        }
        </p>
        {
          }
      </header>
    </div>
  );
}

const applyWithSelect = withSelect( select => {
	return {
		list: select( 'liststore' ).getList(),
		page: select( 'liststore' ).getPage(),
	};
} );

const applyWithDispatch = withDispatch( dispatch => {
	return {
		changePage: dispatch( 'liststore' ).changePage,
	};
} );

export default compose(
	applyWithSelect,
	applyWithDispatch
)( App );
