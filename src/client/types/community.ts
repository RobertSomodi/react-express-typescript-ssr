import { Community } from './state';

export interface CommunityProps {
    community: Community,
    onClick: Function
}

export interface CommunityListProps{
    communities: Array<Community>,
    onClick: Function
}