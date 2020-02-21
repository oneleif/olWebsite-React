import React from 'react';
import { renderWithRouter } from 'test-utils';
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
} from '../../constants/user-constants';
import ProfileView from '../ProfileView';
import { useUser } from '../../contexts/UserContext';

jest.mock('../../contexts/UserContext');
const { UserProvider } = jest.requireActual('../../contexts/UserContext');

const user = {
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
    test("user values should be shown on the page", () => {
        useUser.mockReturnValue([user, null]);
        const { queryByAltText, queryByText } = renderWithRouter(<UserProvider><ProfileView /></UserProvider>);

        expect(queryByAltText('user icon')).toBeInTheDocument();
        expect(queryByText(`@${user[SOCIAL][USERNAME]}`)).toBeInTheDocument();
        expect(queryByText(`${user[SOCIAL][FIRST_NAME]} ${user[SOCIAL][LAST_NAME]}`)).toBeInTheDocument();
        expect(queryByText(user[SOCIAL][LOCATION])).toBeInTheDocument();
        expect(queryByText(user[EMAIL])).toBeInTheDocument();
        expect(queryByText(user[SOCIAL][DISCORED_USERNAME])).toBeInTheDocument();
        expect(queryByText(user[SOCIAL][GITHUB_USERNAME])).toBeInTheDocument();
        expect(queryByText(user[SOCIAL][BIOGRAPHY])).toBeInTheDocument();
        user[SOCIAL][LINKS].forEach(link => {
            expect(queryByText(link)).toBeInTheDocument();
        })
    });
});