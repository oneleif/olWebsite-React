import React from 'react';
import { FaDiscord, FaEnvelope, FaGithubSquare, FaLink, FaLinkedin, FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';
import {
    BIOGRAPHY,
    DISCORED_USERNAME,
    EMAIL,
    FIRST_NAME,
    GITHUB_USERNAME,
    LAST_NAME,
    LINKS,
    LOCATION,
    PROFILE_IMAGE,
    SOCIAL,
    USERNAME
} from '../constants/user-constants';
import IconPlaceholder from '../images/insert-profile-picture-here.png';
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
                    : <img className="user-icon" src={IconPlaceholder} alt="user icon placeholder" />}
                <div className="user-full-name">{user[SOCIAL][FIRST_NAME] || "Auser"} {user[SOCIAL][LAST_NAME] || "Name"}</div>
                <div className="username">@{user[SOCIAL][USERNAME] || "ausername"}</div>
                <div className="user-location"><FaMapMarkerAlt /> {user[SOCIAL][LOCATION] || "Aplace, AbiggerPlace"}</div>
                <div className="user-social-info">
                    <div><FaEnvelope /> {user[EMAIL] || "anaccount@ado.main"}</div>
                    <div><FaDiscord /> {user[SOCIAL][DISCORED_USERNAME] || "AdiscordUserName"}</div>
                    <div><FaGithubSquare /> {user[SOCIAL][GITHUB_USERNAME] || "GotAccount?"}</div>
                    {/* TODO: Add linkedIn account value, after added on backend model */}
                    <div><FaLinkedin /> Replace LinkedIn value</div>
                    {user[SOCIAL][LINKS] && user[SOCIAL][LINKS].map(link =>
                        <div key={link}><FaLink /> <a href={link}> {link}</a></div>
                    )}

                </div>
                <div className="user-social-info">
                    <div className="user-bio-header">User Bio</div>
                    <div>{user[SOCIAL][BIOGRAPHY] || "Bio me up"}</div>
                </div>
                <button type="button">
                    <FaPencilAlt /> Edit Your Info
                    </button>
            </div>
            <div className="user-tabs"></div>
        </div>
    );
};