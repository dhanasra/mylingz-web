import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import APP_LOGO from '../assets/app_images/logo.png'

// material-ui
import { Box, ButtonBase, Stack, Typography } from '@mui/material';

// ==============================|| MAIN LOGO ||============================== //

const Logo = ({ sx }) => {

  const navigate = useNavigate();

  return (
    <ButtonBase
      disableRipple
      component={Link}
      to={'/'}
      sx={sx}
    >
      <Stack direction={"row"} alignItems={"start"} spacing={0.5}>
        <Box component={"img"} src={APP_LOGO} sx={{width: "30px"}}/>
        <Typography
          variant="h2" 
          sx={{
            fontFamily: 'Istok Web',
            background: 'linear-gradient(90deg, #796DFB, #4D478B)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
          }}
        >mylingz</Typography>
      </Stack>
    </ButtonBase>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default Logo;
