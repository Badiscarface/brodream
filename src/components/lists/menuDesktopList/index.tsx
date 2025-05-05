import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
// components
import RootStyled from "./styled";
// material
import { Box, ListSubheader, ListItem } from "@mui/material";

interface SubCategoryProp {
  name: string;
  slug: string;
}

IconBullet.propTypes = {
  type: PropTypes.string.isRequired,
};
function IconBullet({ type = "item" }) {
  return (
    <Box className="icon-bullet-main">
      <Box
        component="span"
        className={`icon-bullet-inner ${type !== "item" && "active"}`}
      />
    </Box>
  );
}
MenuDesktopList.propTypes = {
  parent: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default function MenuDesktopList({ ...props }) {
  const { parent, onClose } = props;

  return (
    <RootStyled disablePadding>
      <>
        <ListSubheader
          disableSticky
          disableGutters
          className="list-subheader"
          onClick={() => {
            onClose();
          }}
          component={NextLink}
          href={"/personnaliser/" + parent?.slug}
        >
          {parent?.name}
        </ListSubheader>
        {parent?.subCategories?.map((subCategory: SubCategoryProp) => (
          <React.Fragment key={Math.random()}>
            <ListItem
              className="list-item"
              onClick={() => {
                onClose();
              }}
              component={NextLink}
              href={`/personnaliser/${parent?.slug}/${subCategory?.slug}`}
            >
              <IconBullet />

              {subCategory?.name}
            </ListItem>
          </React.Fragment>
        ))}
      </>
    </RootStyled>
  );
}
