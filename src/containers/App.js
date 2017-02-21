import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Navibar from '../components/Navibar'

class App extends Component {
  render() {
    return (
      <div>
        <Navibar />
        
        <Grid>
          <Row>
            <Col md={12}>
              { this.props.children }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App