export default function Paper({ ...theme }) {
  return {
    MuiPaper: {
      // defaultProps: {
      //   elevation: 0,
      // },

      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: theme.palette.background.default,
          // borderRadius: theme.spacing(1),
          "&.MuiAppBar-root": {
            boxShadow: "none",
            borderBottom: "1px solid " + theme.palette.divider,
          },
        },
      },
    },
  };
}
