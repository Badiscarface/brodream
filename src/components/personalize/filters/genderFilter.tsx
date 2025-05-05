"use client";
import React, { useCallback, useEffect, useState } from "react";
// mui
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Stack,
  Zoom,
  Box,
} from "@mui/material";
// icons
// next
import { useRouter } from "next-nprogress-bar";
import { useSearchParams, usePathname } from "next/navigation";

interface State {
  genders: string[];
  isLoaded: boolean;
}
const GenderMain = ({ ...props }) => {
  const genders = props.genders;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gender = searchParams.get("gender");
  const { push } = useRouter();

  const [state, setState] = useState<State>({
    genders: [],
    isLoaded: false,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );
  const handleChange = (
    gender: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedGenders = event.target.checked
      ? [...state.genders, gender]
      : state.genders.filter((g) => g !== gender);

    setState({ ...state, genders: updatedGenders });

    const genderQuery = updatedGenders.join("_");
    if (updatedGenders.length > 0) {
      push(`${pathname}?${createQueryString("gender", genderQuery)}`);
    } else {
      push(`${pathname}?${deleteQueryString("gender")}`);
    }
  };

  useEffect(() => {
    setState({
      ...state,
      genders: gender ? gender.split("_") : [],
      isLoaded: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            display: "flex",
            gap: 1,
          }}
          color="text.primary"
        >
          Genre{" "}
          {Boolean(state.genders.length) &&
            gender &&
            `( ${state.genders.length} )`}
        </Typography>
        <Zoom in={state.genders.length > 0}>
          <Button
            onClick={() => {
              setState({ ...state, genders: [] });
              push(`${pathname}?${deleteQueryString("gender")}`);
            }}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ float: "right", boxShadow: "none" }}
          >
            Reset
          </Button>
        </Zoom>
      </Stack>

      <Stack spacing={1}>
        {genders.map((item: { gender: string; total: number | string }) => (
          <FormGroup
            key={Math.random()}
            sx={{
              ml: 1,
            }}
          >
            <FormControlLabel
              sx={{ textTransform: "capitalize" }}
              control={
                <Checkbox
                  size="small"
                  checked={state.genders.includes(item.gender)}
                  onChange={(e) => handleChange(item.gender, e)}
                />
              }
              label={`${item.gender} ( ${item.total} )`} // French label
            />
          </FormGroup>
        ))}
      </Stack>
    </>
  );
};

export default GenderMain;
