import Login from '../components/Login'
import { render, unmountComponentAtNode } from 'react-dom';
describe ('login', () => {
    let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});


it('renders container', () => {
    expect(document.querySelector('div')).not.toBeNull()
  })

})
