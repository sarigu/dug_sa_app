import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Navbar from "./Navbar";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const testUser1 = { 'first_name': 'Bart', 'last_name': 'Simpson' }
const testUser2 = { 'first_name': 'Maggy', 'last_name': 'Simpson' }
const AppContext = React.createContext();

it("renders with or without a name", () => {
    act(() => {
        render(
            <AppContext.Provider value={null}>
                <Navbar />
            </AppContext.Provider>, container);
    });
    expect(container.findByText("Hi,")).toBeInTheDocument()

    act(() => {
        render(
            <AppContext.Provider user={testUser1} >
                <Navbar />
            </AppContext.Provider>, container);
    });
    expect(container.findByText("Hi, Bart")).toBeInTheDocument()

    act(() => {
        render(
            <AppContext.Provider user={testUser2} >
                <Navbar />
            </AppContext.Provider>, container);
    });
    expect(container.findByText("Hi, Maggy")).toBeInTheDocument()
});