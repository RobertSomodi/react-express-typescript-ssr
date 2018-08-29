import * as React from 'react';
import { Button } from 'reactstrap';
import { CommunityProps } from '../../types/community';
import { communities } from '../../reducers/initialState';

class CommunityItem extends React.Component<CommunityProps, any>{
    public constructor(props, context){
        super(props, context);
        this.state = {
            isHovering: false
        }

        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    private handleMouseOver () {
        this.setState({ isHovering: true });
      }

    private handleMouseOut () {
        this.setState({ isHovering: false });
      }

    render() {
        return (
            <div>
                {(this.state.isHovering) && <div className="selection-pointer">&gt;</div>}
                <Button 
                    className="btn-link"
                    outline
                    size="lg"
                    onClick={()=> {this.props.onClick(this.props.community)}}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    >
                    \{this.props.community.name}
                </Button>
            </div>          
        );
    }  
};

export default CommunityItem;
