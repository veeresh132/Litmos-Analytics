import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import litmos from './litmos2.png';

function App() {
  return (
    <body>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://litmos.aha.io/products/LIT/ideas_overview">Litmos Aha! Page</Nav.Link>
        </Nav>
        <img src={litmos} style={{height:'40px', width:'250px', marginRight:'190px'}}/>
        <Form inline>
          <FormControl type="text" placeholder="Search for Idea Topics" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
      <div className="App">
        <h1 style={{textAlign: 'left', marginTop:'40px', marginLeft:'80px'}}> Litmos Aha! Analytics</h1>
        <p class="lead" style={{textAlign:'left', marginLeft:'80px', width:'700px', fontSize:'15px'}}> Welcome to the Litmos Aha! Analytics webpage: a site that provides live analytics on Aha! ideas for Litmos. The data is drawn from Aha!'s REST API and is updated upon request. 
        </p>
      </div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" style={{float:'left', marginLeft: '55px'}}>
          <Typography component="div" style={{ backgroundColor: '#fef3bd', height: '100vh', width: '200vh', marginBottom:'50px'}} />
        </Container>
      </React.Fragment>
    </body>
  );
}

export default App;
