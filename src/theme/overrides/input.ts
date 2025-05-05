export default function Input({ ...theme }) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                "& .MuiInputBase-root": {
                  backgroundColor: theme.palette.background.default,
                },
              },
            },
          ],
        },
      },
    },
  };
}
