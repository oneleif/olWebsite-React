import React from 'react';

import { render, fireEvent, getByLabelText } from '@testing-library/react';
import ToolbarContainer from '../ToolbarContainer.jsx';
import {  BrowserRouter as Router } from "react-router-dom";

describe("Hamburger Toolbar Component Tests", function() {
    let renderedComponent;

    beforeEach(() => {
        renderedComponent = render(<Router><ToolbarContainer/></Router>);
        global.innerWidth = 350;
    });

    test("initial render, dropdown should not be shown", () => {
        const links = renderedComponent.container.querySelector('.link-dropdown');
        expect(links).toBeNull();
    });

    test("Hamburger button clicked, link dropdown is defined", () => {            
        fireEvent(
            getByLabelText(renderedComponent.container, 'Hamburger Button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        const links = renderedComponent.container.querySelector('.link-dropdown');
        expect(links).toBeDefined();
    });
});