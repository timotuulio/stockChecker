import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    ButtonToolbar,
    ButtonGroup,
    Button,
    Navbar,
    NavbarBrand,
    Nav
} from 'reactstrap';

function Header() {
  const page = usestate(0)

  return (<Navbar sticky="top" style={{
          backgroundColor: '#2B3856'
      }}>
      <NavbarBrand style={{
              color: "#007bff"
          }}>Paavos Boutique</NavbarBrand>

      <Nav className="mr-auto" navbar>
          <ButtonToolbar aria-label="Toolbar with button groups">

              <ButtonGroup className="mr-2"></ButtonGroup>
              {
                  (() => {
                      return <div>
                        <ButtonGroup className="mr-2">
                          <Button color="primary">Shop</Button>
                          <Button color="primary">Profile</Button>
                          <Button color="primary">Sell product</Button>
                        </ButtonGroup>
                      </div>;
                  })()
              }
          </ButtonToolbar>
      </Nav>
  </Navbar>);
}

export default Header;
