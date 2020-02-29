import React from 'react';
import { FaDiscord, FaEnvelope, FaGithubSquare, FaLink, FaLinkedin, FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';
import {
    BIOGRAPHY,
    BIOGRAPHY_DEFAULT,
    DISCORED_USERNAME,
    DISCORED_USERNAME_DEFAULT,
    EMAIL,
    FIRST_NAME,
    FIRST_NAME_DEFAULT,
    GITHUB_USERNAME,
    GITHUB_USERNAME_DEFAULT,
    LAST_NAME,
    LAST_NAME_DEFAULT,
    LINKS,
    LOCATION,
    LOCATION_DEFAULT,
    PROFILE_IMAGE,
    PROFILE_IMAGE_DEFAULT,
    SOCIAL,
    USERNAME,
    USERNAME_DEFAULT,
} from '../constants/user-constants';
import { useUser } from '../contexts/UserContext';

export default function ProfileView() {
    /************************************
     * State
     ************************************/

    const [user] = useUser();

    /************************************
     * Render
     ************************************/

    return (
        <div className="profile-view-body">
            <div className="user-info">
                {user[SOCIAL][PROFILE_IMAGE] ?
                    <img className="user-icon" src={user[SOCIAL][PROFILE_IMAGE]} alt="user icon" />
                    : <img className="user-icon" src={PROFILE_IMAGE_DEFAULT} alt='user icon placeholder' />}
                <div className="user-full-name">{user[SOCIAL][FIRST_NAME] || FIRST_NAME_DEFAULT} {user[SOCIAL][LAST_NAME] || LAST_NAME_DEFAULT}</div>
                <div className="username">@{user[SOCIAL][USERNAME] || USERNAME_DEFAULT}</div>
                <div className="user-location"><FaMapMarkerAlt /> {user[SOCIAL][LOCATION] || LOCATION_DEFAULT}</div>
                <div className="user-social-info">
                    <div><FaEnvelope /> {user[EMAIL]}</div>
                    <div><FaDiscord /> {user[SOCIAL][DISCORED_USERNAME] || DISCORED_USERNAME_DEFAULT}</div>
                    <div><FaGithubSquare /> {user[SOCIAL][GITHUB_USERNAME] || GITHUB_USERNAME_DEFAULT}</div>
                    {/* TODO: Add linkedIn account value, after added on backend model */}
                    <div><FaLinkedin /> Replace LinkedIn value</div>
                    {user[SOCIAL][LINKS] && user[SOCIAL][LINKS].map(link =>
                        <div key={link}><FaLink /> <a href={link}> {link}</a></div>
                    )}

                </div>
                <div className="user-social-info">
                    <div className="user-bio-header">User Bio</div>
                    <div>{user[SOCIAL][BIOGRAPHY] || BIOGRAPHY_DEFAULT}</div>
                </div>
                <button type="button">
                    <FaPencilAlt /> Edit Your Info
                    </button>
            </div>
            <div className="user-tabs"></div>
        </div>
    );
};