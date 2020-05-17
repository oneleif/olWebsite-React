import React from 'react';

import Card from '../Objects/Card/Card';
import CardContent from '../Objects/Card/CardContent';
import CardFooter from '../Objects/Card/CardFooter';
import CardTagContainer from '../Objects/Card/CardTagContainer';
import Tag from '../Tag/Tag';

export default function MeetTheTeamCard({ card }) {
  /************************************
   * Render
   ************************************/

  return (
    <Card className='meet-the-team-card'>
      <CardContent>
        <img src={card.image} alt={card.name}/>
        <h4>{card.name}</h4>
        <p className='role-copy'>{card.role}</p>
        <p className='location-copy'>{card.location}</p>
      </CardContent>
      <CardFooter>
        <CardTagContainer>
          {card.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </CardTagContainer>
      </CardFooter>
    </Card>
  );
}
