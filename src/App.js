import React from "react";
import { lightTheme } from "./constants";
import SwingCalculator from "./SwingCalculator";

function App() {
    const [theme, setTheme] = React.useState(lightTheme);
    React.useEffect(() => {
        document.body.style.backgroundColor = theme.background;
    }, [theme]);

    return (
        <div className={"text-" + theme.text}>
            <SwingCalculator theme={theme} setTheme={setTheme} />
        </div>
    );
}

export default App;
