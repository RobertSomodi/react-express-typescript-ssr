import * as React from 'react';
import Helmet from 'react-helmet';
import { Redirect, Link, Route } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';

interface IRootProps {
  route: {
    routes: RouteConfig[];
  };
}

export default class Root extends React.Component<IRootProps, any> {
  public render () {
    const APP_NAME = 'any app name';
    return (
      <div>
        <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}
