import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

export default function ToggleColorMode(props: any) {
	const [mode, setMode] = useState<"light" | "dark">("light");

	useEffect(() => {
		// create darkmode in localstorage
		if (!localStorage.getItem("darkmode")) {
			localStorage.setItem("darkmode", mode);
		}
		const darkmode = localStorage.getItem("darkmode");
		setMode(darkmode === "light" ? "light" : "dark");
	}, []); // eslint-disable-line

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				// get darkmode from localstorage
				const darkmode = localStorage.getItem("darkmode");

				// toggle darkmode in localstorage
				localStorage.setItem(
					"darkmode",
					darkmode === "light" ? "dark" : "light"
				);

				// toggle our state
				setMode(darkmode === "light" ? "dark" : "light");
			},
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{props.children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
