import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { fDateShort } from "@/utils/formatTime";

export default function DetailList({ ...props }) {
  const { detail } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 400,
          width: "100%",
          mb: 2,

          img: {
            objectFit: "cover",
            borderRadius: "12px",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            height: 30,
            width: 110,
            bgcolor: theme.palette.background.paper,
            border: "1px solid" + theme.palette.divider,
            borderRadius: 1,
            zIndex: 99,
            transition: "ease-in-out .3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="subtitle2" textAlign="center">
            {fDateShort(new Date(detail.createdAt))}
          </Typography>
        </Box>
        <Image src={detail.cover.url} alt={detail.name} fill />
      </Box>
      <Box
        mt={1}
        dangerouslySetInnerHTML={{
          __html: `${detail.description}`,
        }}
      />
      {detail.section.map(
        (item: {
          name: string;
          description: string;
          cover: {
            url: string;
          };
        }) => (
          <Box
            key={Math.random()}
            mt={5}
            sx={{
              position: "relative",
            }}
          >
            <Typography variant="h3">{item.name}</Typography>
            <Box
              sx={{
                position: "relative",
                height: 400,
                width: "100%",
                my: 2,
                img: {
                  objectFit: "cover",
                  borderRadius: "12px",
                },
              }}
            >
              <Image src={detail.cover.url} alt={item.name} fill />
            </Box>
            <Box
              dangerouslySetInnerHTML={{
                __html: `${item.description}`,
              }}
            />
          </Box>
        )
      )}
    </Box>
  );
}
