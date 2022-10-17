import { useRef } from 'react';
import {Save} from '@mui/icons-material'
import {DialogTitle, CardHeader, DialogContent, TextField, Button} from "@mui/material";
import {useForm, Controller} from 'react-hook-form';



const UserForm: React.FC = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const { control, formState: { errors }, handleSubmit, getValues } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  });

  const onSubmit = (data:any) => {};

  return(
    <form ref={formRef}>
        <DialogTitle>
          <CardHeader
              className="card-top"
              title="Wednesday, July 1, 2020"
              action={
                <Button 
                startIcon={<Save />}
                size={"small"}
                variant={'outlined'}
                onClick={handleSubmit(onSubmit)}
                >
                Register
              </Button>
              }
          />
        </DialogTitle>
        <DialogContent>
          <Controller 
            name="nickname"
            control={control}
            rules={{ 
              required: 'Name is required',
              minLength: {
                value: 4,
                message: 'Min lenght 4'
              }
            }}
            render={({ field }) => 
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                variant="outlined"
                margin="dense"
                placeholder='Name'
                error={errors.nickname ? true : false}
                helperText={errors.nickname?.message}
              />}
          />

          <Controller 
            name="email"
            control={control}
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid Email',
            },
            }}
            render={({ field }) => 
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                variant="outlined"
                margin="dense"
                type="email"
                placeholder='Email'
                error={errors.email ? true : false}
                helperText={errors.email?.message}
              />}
          />

          <Controller 
            name="password"
            control={control}
            rules={{ required: 'Password is reqired' }}
            render={({ field }) => 
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                variant="outlined"
                margin="dense"
                type="password"
                placeholder='Password'
                error={errors.password ? true : false}
                helperText={errors.password?.message}
              />}
          />

          <Controller 
            name="passwordConfirm"
            control={control}
            rules={{ 
              required: 'Password confirm is reqired',
              validate: (value: string) => {
                const {password} = getValues();
                if(password !== value) return 'Your passwords do no match'
              }
             }}
            render={({ field }) => 
              <TextField
                {...field}
                fullWidth
                id="outlined-basic"
                variant="outlined"
                margin="dense"
                type="password"
                placeholder='Password confirm'
                error={errors.passwordConfirm ? true : false}
                helperText={errors.passwordConfirm?.message}
              />}
          />

        </DialogContent>
    </form>
    )
};

export default UserForm;