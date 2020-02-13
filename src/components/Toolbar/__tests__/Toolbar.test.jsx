import React from 'react';
import { renderWithRouter } from "test-utils";
import Toolbar from '../Toolbar';
import { useUser } from '../../../contexts/UserContext';

jest.mock('../../../contexts/UserContext');
const { UserProvider } = jest.requireActual('../../../contexts/UserContext');


describe("Hamburger Toolbar Component Tests", function() {

    test("initial render, without a user, sign up should be shown", () => {
        useUser.mockReturnValue([null, null]);
        const { queryAllByRole, queryByText } = renderWithRouter(<UserProvider><Toolbar /></UserProvider>);

        // 5 links (home, about us, posts, partners, sign up)
        expect(queryAllByRole("link").length).toBe(5);
        expect(queryByText("About Us")).toBeInTheDocument();
        expect(queryByText("Posts")).toBeInTheDocument();
        expect(queryByText("Partners")).toBeInTheDocument();
        expect(queryByText("Sign Up")).toBeInTheDocument();
    });

    test("Show profile link and not sign up when a user exists in the context", () => {
        useUser.mockReturnValue([{something: 'anything'}]);
        const { queryAllByRole, queryByText } = renderWithRouter(<UserProvider><Toolbar /></UserProvider>);

        // 5 links (home, about us, posts, partners, profile)
        expect(queryAllByRole("link").length).toBe(5);
        expect(queryByText("About Us")).toBeInTheDocument();
        expect(queryByText("Posts")).toBeInTheDocument();
        expect(queryByText("Partners")).toBeInTheDocument();
        expect(queryByText("Sign Up")).not.toBeInTheDocument();
    });

});