import React from "react";
import { darkTheme, lightTheme } from "./constants";
import SwingCalculator from "./SwingCalculator";

function App() {
  const lastUpdatedTheme = window.localStorage.getItem("theme") === "light" ? lightTheme : darkTheme;
    const [theme, setTheme] = React.useState(lastUpdatedTheme);
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
