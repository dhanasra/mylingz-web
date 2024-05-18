import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from '../../../../components/AppLogo';


const DrawerHeader = ({ open }) => {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{pr: 4}}>
        <Logo />
        </Box>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
