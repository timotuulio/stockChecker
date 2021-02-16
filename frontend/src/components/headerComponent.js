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
import { Link } from 'react-router-dom'

function Header({page}) {
  //const [page, setPage] = useState("0")
  console.log(page)
  return (<Navbar sticky="top" style={{
          backgroundColor: '#2B3856'
      }}>
      <NavbarBrand style={{
              color: "#007bff"
          }}>Stock checker</NavbarBrand>

      <Nav className="mr-auto" navbar>
          <ButtonToolbar aria-label="Toolbar with button groups">

              <ButtonGroup className="mr-2"></ButtonGroup>
              {
                  (() => {
                      return <div>
                        <ButtonGroup className="mr-2">
                          <Link to={'/asd'}>
                            <Button color="primary">Upward trends</Button>
                          </Link>
                          <Button color="primary" onClick={() => page = "volume"}>Highest volume</Button>
                          <Button color="primary" onClick={() => page = "change"}>Highest change</Button>
                          <Button color="primary" onClick={() => page = "something"}>page: {page}</Button>
                        </ButtonGroup>
                      </div>;
                  })()
              }
          </ButtonToolbar>
      </Nav>
  </Navbar>);
}

export default Header;
