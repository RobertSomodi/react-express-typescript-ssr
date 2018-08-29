import * as React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { BorderedPanelProps } from '../../types/common';


class BorderedPanel extends React.Component<BorderedPanelProps, any> {
    render() {
        return(
            <Card className="bordered-panel">
                <CardHeader>{this.props.title}</CardHeader>
                <CardBody>
                    {this.props.children}
                </CardBody>
            </Card>
        );
    }
}

export default BorderedPanel;
