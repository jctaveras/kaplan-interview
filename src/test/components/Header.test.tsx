import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/header';

describe('Header Component', () => {
  const Component = () => (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  describe('when header is not visible', () => {
    [
      {
        message: 'should not render the header component when the user is in the login page',
        pageTitle: 'Sign In Page',
        path: '/login'
      },
      {
        message: 'should not render the header component when the user is in the logout page',
        pageTitle: 'Log Out Page',
        path: '/logout'
      }
    ].forEach(({message, pageTitle, path }) => {
      test(message, () => {
        window.history.pushState({}, pageTitle, path);
        const { container } = render(<Component />);
    
        expect(container.firstChild).toBeNull();
      });
    });
  });

  describe('when header is visible', () => {
    let container: HTMLElement;
    
    beforeEach(() =>{
      window.history.pushState({}, 'Home', '/');
      container = render(<Component />).container;
    });

    test('should render the header component', () => {
      expect(container.firstChild).toBeDefined();
      expect(container.firstChild).toHaveClass('app-header');
      expect(container.firstChild?.childNodes).toHaveLength(2);
    });

    test('should render menu button', () => {
      const menuButton = container.firstChild?.firstChild;
  
      expect(menuButton).toHaveClass('menu');
      expect(menuButton?.nodeName).toBe('BUTTON');
      expect(menuButton?.childNodes).toHaveLength(1);
      expect(screen.getByAltText('Menu')).toBeDefined();
    });

    test('should toggle navigation visibility', () => {
      expect(container.firstChild?.lastChild).toHaveClass('hidden');
      
      fireEvent.click(screen.getByAltText('Menu'), { button: 1 });
      
      expect(container.firstChild?.lastChild).toHaveClass('visible');
    });
  });

  describe('when the Header component is rendered in the homepage', () => {
    let container: HTMLElement;
    
    beforeEach(() =>{
      window.history.pushState({}, 'Home', '/');
      container = render(<Component />).container;
    });

    test('should render the navigation', () => {
      const el = container.firstChild?.lastChild;

      expect(el?.nodeName).toBe('NAV');
      expect(el?.childNodes).toHaveLength(2);
    });

    test('should not render the home link', () => {
      expect(screen.queryAllByText('Home')).toHaveLength(0);
    });

    test('should render the links', () => {
      ['Account', 'Logout'].forEach(link => {
        const el = screen.getByText(link); 

        expect(el).toBeInTheDocument();
        expect(el.nodeName).toBe('A');
      });
    });
  });
});
