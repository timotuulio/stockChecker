//import logo from './logo.svg';
//import './App.css';
import {
    Alert,
    Input,
    InputGroup,
    Card,
    CardBody,
    Button
} from 'reactstrap';


let submit = (e, data) => {
  console.log("we now submit asd")
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var url = "http://localhost:3001/api/highestChange?start=" + start + "&end=" + end

  fetch(url, {
    method: "GET"
  }).then(response => response.json())
}

function Body() {

  return (<div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
          }}>

          <h2 className="display-4">Give date ranges</h2>
          <hr className="my-2"/>
          <br/><br/>

          <form id="Check stocks" onSubmit={submit}>
              <div style={{
                      width: "100%"
                  }}>

                  <Card className="text-center">

                      <CardBody>
                          <InputGroup>
                              <Input type="text" id="start" placeholder="Email"/>
                          </InputGroup>
                          <br></br>
                          <InputGroup>
                              <Input type="text" id="end" placeholder="Password"/>
                          </InputGroup>
                          <br></br>

                          <Button block color="primary" size="lg">Check stocks</Button>
                      </CardBody>

                  </Card>

              </div>
          </form>
      </div>)
}

export default Body;
