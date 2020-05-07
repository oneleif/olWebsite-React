import React from 'react';

import { ReactComponent as TeamMap } from '../assets/TeamMap/team-map.svg';
import PageHeader from '../components/PageHeader/PageHeader';

export default function MeetTheTeamView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className='meet-team-view-container'>
      <PageHeader title='Meet the Team' img={<TeamMap />}>
        <p>
          oneleif has an exceptional team with diverse skill-sets and unique backgrounds. 
          Our members are constantly learning and collaborating.
        </p>
      </PageHeader>
    </div>
  );
}
