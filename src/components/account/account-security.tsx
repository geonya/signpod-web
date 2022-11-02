import { useReactiveVar } from '@apollo/client'
import { AccountCircle } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { userVar } from '../../lib/apollo/cache'

export const AccountSecurity: FC = (props) => {
  const user = useReactiveVar(userVar)
  return (
    <Box sx={{ mt: 4 }} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant='h6'>비밀 번호</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  my: 3,
                  alignItems: 'center',
                }}
              >
                <TextField
                  defaultValue={user?.name || ''}
                  label='현재 비밀번호'
                  type='password'
                  size='medium'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center',
                }}
              >
                <TextField
                  defaultValue={''}
                  label='비밀번호 확인'
                  required
                  size='medium'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  my: 3,
                  alignItems: 'center',
                }}
              >
                <TextField
                  defaultValue={''}
                  label='변경할 비밀번호'
                  required
                  size='medium'
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                  }}
                />
              </Box>
              <Button color='info' variant='outlined'>
                비밀번호 변경
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
