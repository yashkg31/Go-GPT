import { TextField } from "@mui/material";

type Props = {
    name: string;
    type: string;
    label: string
}

const CustomInput = (props: Props) => {
    
  return (
    <TextField name={props.name}
    label={props.label}
    type={props.type}
    fullWidth
    margin="normal"
    InputLabelProps={{style:
        {color: "white"}
    }}
    InputProps={{style:
        {color: "white"}
    }}
    sx={{
        '& .MuiInputBase-root': {
          color: 'white', // Text color
          borderRadius: '20px', // Border radius
          '& fieldset': {
            borderRadius: '20px', // Border radius for outlined variant
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white', // Label color
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: 'white', // Bottom border color when not focused
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'white', // Bottom border color on hover
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'white', // Bottom border color when focused
        },
        '& input:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px black inset',
          WebkitTextFillColor: 'white',
          borderRadius: '20px', // Border radius for autofilled input
        },
      }}
    >

    </TextField>
  )
}

export default CustomInput