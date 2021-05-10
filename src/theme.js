import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: red[500],
		},
		secondary: {
			main: blue[500],
		},
	},
});