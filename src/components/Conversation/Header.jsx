import React from 'react'
import { faker } from '@faker-js/faker';
import { Stack, Box, Avatar, Typography, IconButton, Divider } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { ToggleSideBar } from '../../redux/slices/app';
import StyledBadge from '../StyledBadge';

const Header = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
  return (
    <Box
            p={2}
            sx={{
                height: 100,
                width: "100%",
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Stack                
                direction={"row"}                   
                alignItems={"center"}
                justifyContent={"space-between"} 
                sx={{
                    width: "100%",
                    height: "100%"
                }}    
            >
                <Stack                     
                    direction={"row"}
                    alignItems={"center"}
                    spacing={3}
                >
                    <StyledBadge
                    onClick={() => {
                        dispatch(ToggleSideBar())
                    }}
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar alt={faker.person.fullName()} src={faker.image.urlLoremFlickr({ category: 'avatar' })} />
                    </StyledBadge>
                        <Stack
                            spacing={0.2}
                            direction={"column"}
                        >
                            <Typography variant='subtitle2'>
                                {faker.person.fullName()}
                            </Typography>
                            <Typography variant='caption'>
                            Online
                            </Typography>    
                    </Stack>           
                </Stack>
                <Stack 
                    direction="row"
                    alignItems={"center"}
                    spacing={3}                    
                >
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <VideoCamera size={24} />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <Phone size={24} />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <MagnifyingGlass size={24} />
                    </IconButton>
                     <Divider 
                        orientation={"vertical"}
                        flexItem
                    />
                    <IconButton
                        sx={{
                            color: theme.palette.mode === 'light' ? "#000" : theme.palette.text.primary
                        }}
                    >
                        <CaretDown size={24} />
                    </IconButton> 
                </Stack>
            </Stack>
        </Box>
  )
}

export default Header;
