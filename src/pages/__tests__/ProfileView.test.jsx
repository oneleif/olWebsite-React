import React from 'react';
import { renderWithRouter } from 'test-utils';
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
    SOCIAL,
    USERNAME,
    USERNAME_DEFAULT
} from '../../constants/user-constants';
import ProfileView from '../ProfileView';
import { useUser } from '../../contexts/UserContext';

jest.mock('../../contexts/UserContext');
const { UserProvider } = jest.requireActual('../../contexts/UserContext');

const user = {
    [EMAIL]: 'anEmail@adomain.com',
    [SOCIAL]: {},
}

const userAllValues = {
    [EMAIL]: 'anEmail@adomain.com',
    [SOCIAL]: {
        [PROFILE_IMAGE]: 'src/image.png',
        [USERNAME]: 'someuserName',
        [FIRST_NAME]: 'Some',
        [LAST_NAME]: 'LastName',
        [LOCATION]: 'SomePlace, SomeLargerPlace',
        [DISCORED_USERNAME]: 'DicordingName',
        [GITHUB_USERNAME]: 'GithubberName',
        [BIOGRAPHY]: 'Lines of the bios',
        [LINKS]: ['url/url', 'url2/url2']
    }
}

describe('verify correct values are displayed from user context', () => {
    test("default user values are shown when user doesn't have their own", () => {
        useUser.mockReturnValue([user, null]);
        const { queryByAltText, queryByText } = renderWithRouter(<UserProvider><ProfileView /></UserProvider>);

        expect(queryByAltText('user icon placeholder')).toBeInTheDocument();
        expect(queryByText(`@${USERNAME_DEFAULT}`)).toBeInTheDocument();
        expect(queryByText(`${FIRST_NAME_DEFAULT} ${LAST_NAME_DEFAULT}`)).toBeInTheDocument();
        expect(queryByText(LOCATION_DEFAULT)).toBeInTheDocument();
        expect(queryByText(user[EMAIL])).toBeInTheDocument();
        expect(queryByText(DISCORED_USERNAME_DEFAULT)).toBeInTheDocument();
        expect(queryByText(GITHUB_USERNAME_DEFAULT)).toBeInTheDocument();
        expect(queryByText(BIOGRAPHY_DEFAULT)).toBeInTheDocument();
    });
    test("user values should be shown on the page", () => {
        useUser.mockReturnValue([userAllValues, null]);
        const { queryByAltText, queryByText } = renderWithRouter(<UserProvider><ProfileView /></UserProvider>);

        expect(queryByAltText('user icon')).toBeInTheDocument();
        expect(queryByText(`@${userAllValues[SOCIAL][USERNAME]}`)).toBeInTheDocument();
        expect(queryByText(`${userAllValues[SOCIAL][FIRST_NAME]} ${userAllValues[SOCIAL][LAST_NAME]}`)).toBeInTheDocument();
        expect(queryByText(userAllValues[SOCIAL][LOCATION])).toBeInTheDocument();
        expect(queryByText(userAllValues[EMAIL])).toBeInTheDocument();
        expect(queryByText(userAllValues[SOCIAL][DISCORED_USERNAME])).toBeInTheDocument();
        expect(queryByText(userAllValues[SOCIAL][GITHUB_USERNAME])).toBeInTheDocument();
        expect(queryByText(userAllValues[SOCIAL][BIOGRAPHY])).toBeInTheDocument();
        userAllValues[SOCIAL][LINKS].forEach(link => {
            expect(queryByText(link)).toBeInTheDocument();
        })
    });
});