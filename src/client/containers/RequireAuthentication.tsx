import * as  React from 'react';  
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import {user} from '../reducers/initialState';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component<any,any> {

    static contextTypes = {
      router: PropTypes.object.isRequired
    };

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
   
      this.checkAuth()
    }

    checkAuth() {
       let authenticated  = this.props.user.isAuthenticated;
       if (!authenticated) {
        this.props.dispatch(push(null,'/login'));
      }
    }

    render() {
      return (
        <div>
          {true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({user: state.user});
  const mapDispatchToProps = (dispatch) => {
    return {dispatch};
  }
 
  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}