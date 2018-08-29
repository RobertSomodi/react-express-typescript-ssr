import * as React from 'react';
import { CommunityListProps } from '../../types/community';
import CommunityItem from './CommunityItem';

const CommunityList: React.SFC<CommunityListProps> = ({communities, onClick}) => {
    let communitiesList = communities.map((commmunityItem, index) => {
        return <CommunityItem
                 key={commmunityItem.id}
                 community={commmunityItem}
                 onClick={onClick}
                 />
    });
    return (
        <div>
            {communitiesList}
        </div>         
    );
};

export default CommunityList;
