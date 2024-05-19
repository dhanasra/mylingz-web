// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Stack } from '@mui/material';

// assets
import Google from '../../../assets/icons/google.svg';
import Github from '../../../assets/icons/github.svg';
import { githubLogin, googleLogin } from '../../../network/auth_service';
import { useNavigate } from 'react-router-dom';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

const FirebaseSocial = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const authWithGoogle = async()=>{
    const data =await googleLogin();
    if(data.success){
      navigate('/app/links')
    }
  }

  const authWithGithub = async()=>{
    const data =await githubLogin();
    if(data.success){
      navigate('/app/links')
    }
  }
  

  return (
    <Stack
      direction="row"
      spacing={matchDownSM ? 1 : 2}
      justifyContent={matchDownSM ? 'space-around' : 'space-between'}
      sx={{ '& .MuiButton-startIcon': { mr: matchDownSM ? 0 : 1, ml: matchDownSM ? 0 : -0.5 } }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Google} alt="Google" />}
        onClick={authWithGoogle}
      >
        {!matchDownSM && 'Google'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth={!matchDownSM}
        startIcon={<img src={Github} alt="Github" />}
        onClick={authWithGithub}
      >
        {!matchDownSM && 'Github'}
      </Button>
    </Stack>
  );
};

export default FirebaseSocial;
