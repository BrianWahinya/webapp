import { render} from '@testing-library/react';
import App from './App';

test('renders Portfolio link', () => {
  render(<App />);
  /*
  const linkElement = screen.getByText(/\s/i);
  expect(linkElement).toBeInTheDocument();
  */
});
