import React, { useState, useEffect } from 'react';

import { ReactComponent as TeamMap } from '../assets/TeamMap/team-map.svg';
import PageHeader from '../components/PageHeader/PageHeader';

import teamMembers from './js/teamMembers';
import MeetTheTeamCard from '../components/MeetTheTeamCard/MeetTheTeamCard';
import ReactHelmetWrapper from '../components/ReactHelmetWrapper';
import LinkPreviewImage from '../assets/LinkPreview/ol-socialCard_1.png';

export default function MeetTheTeamView() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const team = loadTeamMembers();
    setMembers(team);
  }, []);

  function loadTeamMembers() {
    //TODO: In V2 once the members are dynamic, will be loading them here
    return teamMembers;
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='meet-team-view-container'>
      <ReactHelmetWrapper
        title='Meet the Team'
        description='Meet the members of the team that helped buld this website.'
        image={LinkPreviewImage}
        path='/team'
      />
      <PageHeader title='Meet the Team' img={<TeamMap />}>
        <p>
          oneleif has an exceptional team with diverse skill-sets and unique backgrounds. Our members are constantly learning and
          collaborating.
        </p>
      </PageHeader>
      <div className='meet-team-card-container'>
        {members.map((member, index) => (
          <MeetTheTeamCard member={member} key={index} />
        ))}
      </div>
    </div>
  );
}
