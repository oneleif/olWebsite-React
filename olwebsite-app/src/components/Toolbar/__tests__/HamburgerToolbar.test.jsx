import React from 'react';

import HamburgerToolbar from '../HamburgerToolbar';
import { renderWithRouter, getComponentFromDOM, clickEventByLabelText} from "test-utils";

describe("Hamburger Toolbar Component Tests", function() {
    let renderedComponent;

    beforeEach(() => {
        renderedComponent = renderWithRouter(<HamburgerToolbar/>);
    });

    test("initial render, dropdown should not be shown", () => {
        const links = getComponentFromDOM(renderedComponent.container, '.link-dropdown');
        expect(links).not.toBeInTheDocument();
    });

    test("Hamburger button clicked, link dropdown is defined/undefined when toggled", () => {        
        let links;   
        links = getComponentFromDOM(renderedComponent.container, '.link-dropdown');
        expect(links).not.toBeInTheDocument();

        clickEventByLabelText(renderedComponent.container, 'Hamburger Button');

        links = getComponentFromDOM(renderedComponent.container, '.link-dropdown');
        expect(links).toBeInTheDocument();

        clickEventByLabelText(renderedComponent.container,'Hamburger Button');

        links = getComponentFromDOM(renderedComponent.container, '.link-dropdown');
        expect(links).not.toBeInTheDocument();
    });

});
