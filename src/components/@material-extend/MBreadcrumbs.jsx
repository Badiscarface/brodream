import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { last } from "lodash";
// mui
import { Typography, Box, Link, Breadcrumbs } from "@mui/material";
import { IoChevronForwardOutline } from "react-icons/io5";

function LinkItem({ link, admin }) {
  const { href, name, icon } = link;
  return (
    <Link
      component={NextLink}
      key={name}
      href={href}
      passHref
      variant={admin ? "subtitle2" : "subtitle2"}
      sx={{
        lineHeight: 2,
        display: "flex",
        fontWeight: 500,
        alignItems: "center",
        color: admin ? "text.secondary" : "text.secondary",
        "& > div": { display: "inherit" },
      }}
    >
      {icon && (
        <Box
          sx={{
            mr: 1,
            "& svg": {
              width: admin ? 30 : 20,
              height: admin ? 30 : 20,
              color: admin ? "text.secondary" : "text.secondary",
            },
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </Link>
  );
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node,
  }).isRequired,
  admin: PropTypes.bool.isRequired,
};

function MBreadcrumbs({ links, admin, activeLast = false, ...other }) {
  const currentLink = last(links)?.name;

  const listDefault = links.map((link) => (
    <LinkItem key={Math.random()} link={link} admin={admin} />
  ));
  const listActiveLast = links.map((link) => (
    <div key={Math.random()}>
      {link.name !== currentLink ? (
        <LinkItem link={link} admin={admin} />
      ) : (
        <Typography
          variant={admin ? "subtitle2" : "subtitle2"}
          sx={{
            maxWidth: 260,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: admin ? "text.disabled" : "text.secondary",
            textOverflow: "ellipsis",
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs
      separator={
        <Box
          component={IoChevronForwardOutline}
          sx={{
            color: "text.secondary",
          }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}

MBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  admin: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  activeLast: PropTypes.bool,
};

export default MBreadcrumbs;
