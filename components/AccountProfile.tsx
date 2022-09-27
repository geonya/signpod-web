import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import {
  displayFlex,
  PRIMARY,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from '../constants'

interface AccountProfileProps {
  name: string
  email: string
  avatar?: string
}

const AccountProfile = ({ name, email, avatar }: AccountProfileProps) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            ...displayFlex,
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={avatar || '/avatar.jpeg'}
            sx={{ width: 64, height: 64, mb: 2 }}
          />
          <Typography color={TEXT_PRIMARY} gutterBottom variant='h5'>
            {name}
          </Typography>
          <Typography color={TEXT_SECONDARY} variant='body2'>
            {email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color={PRIMARY} fullWidth variant='text'>
          프로필 사진 업로드
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile
