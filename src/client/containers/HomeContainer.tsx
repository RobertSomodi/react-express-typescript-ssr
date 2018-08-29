import * as React from 'react';

import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as _ from "lodash";
import Helmet from 'react-helmet';

import { Container, Row, Col, CardTitle, CardText } from 'reactstrap';

import TypedText from '../components/common/TypedText';
import CommunityList from '../components/community/CommunityList';
import BorderedPanel from '../components/common/BorderedPanel';
import { communities } from '../reducers/initialState';
import * as types from '../types/state';

import {State} from '../types/state';

class Home extends React.Component<any, any> {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  public constructor(props, context) {
    super(props, context);

    this.state = {
      communities: _.map(communities, _.clone)
    };

    this.onClick = this.onClick.bind(this);
  };

  public onClick(community: types.Community){
    this.context.router.history.push('/community/' + community.name);
  }

  componentWillMount(){
    if(this.props.user.userData.role != 'guest'){
      this.context.router.history.push('/admin');
    }
  }

  public render () {
    return (
      <div>
        <Helmet title='Home' />
        <Container className="fullHeight_container">
          <Row className="h-100 align-items-center justify-content-center">
            <Col>
              <TypedText
                text="Please choose a community to start a quiz!"
              />
              <Row className="mt-5">
                <Col xs="4">
                  <CommunityList
                    communities={this.state.communities} 
                    onClick={this.onClick}/>
                </Col>
                <Col xs="8">
                  <BorderedPanel
                    title="Info panel"
                  >
                    <CardTitle>Subtitlu</CardTitle>
                    <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis suscipit metus, eget dictum justo. Nullam commodo malesuada lorem elementum sagittis.</CardText>
                  </BorderedPanel>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({user: state.user});
const mapDispatchToProps = ( dispatch ) => {
    return {
            actions: {}
            };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);