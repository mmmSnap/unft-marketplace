import { ThemeProvider } from "@mui/material/styles";
import ThemSetup from "./them";

export default function Layout({ children }) {
    return (
        <ThemeProvider theme={ThemSetup}>
            {children}
        </ThemeProvider>
    );
}