import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router";
import { describe, it } from "vitest";

describe("App", () => {
    it("renders without crashing", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        // Basic check to see if the main container or header is present
        // Since we have lazy loaded components, we might see a loader initially
        // or the header which is not lazy loaded.
        // Let's check for something we know is in Header or Footer
        // screen.debug(); 
    });
});
