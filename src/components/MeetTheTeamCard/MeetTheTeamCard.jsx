import React from 'react';

import Card from '../Objects/Card/Card';
import CardContent from '../Objects/Card/CardContent';
import CardFooter from '../Objects/Card/CardFooter';
import CardTagContainer from '../Objects/Card/CardTagContainer';
import Tag from '../Tag/Tag';

export default function MeetTheTeamCard({ member }) {
  /************************************
   * Render
   ************************************/

  return (
    <Card className='meet-the-team-card'>
      <CardContent>
        <img src={member.image} alt={member.name}/>
        <h4>{member.name}</h4>
        <p className='role-copy'>{member.role}</p>
        <p className='location-copy'>{member.location}</p>
      </CardContent>
      <CardFooter>
        <CardTagContainer>
          {/* // TODO: calculate tags to show based off the width of the view */}
          {member.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </CardTagContainer>
      </CardFooter>
    </Card>
  );
}
