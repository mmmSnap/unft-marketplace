import React from 'react'
import Layout from '../../components/Layout'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/router'
import ReviewDetails from '../../components/MuiComponent/MuiBookingDetailsPage/reviewDetails';
import BookingConfirm from '../../components/MuiComponent/MuiBookingDetailsPage/bookingConfirm';
import MuiBookingForms from '../../components/MuiComponent/MuiBookingDetailsPage/MuiBookingForms';
import { getSinglePhotoGrapher } from '../../globalServices/getPhotoGrapherDetails';
import PhotoGrapherAddress from '../../components/MuiComponent/MuiBookingDetailsPage/PhotoGrapherAddress';
import BasicDatePicker from '../../components/MuiComponent/formsElement/DatePickerLocal';
import { useForm } from 'react-hook-form';
const steps = ['Select or Enter Address Type', 'Review Booking details', 'Booking Confirmation Details'];
import MuiDateComponent from '../../components/MuiComponent/MuiDateComponent/MuiDateComponent';
import useMuiDateHook from '../../components/MuiComponent/MuiDateComponent/useMuiDateHook';
import MuiBookingReviewForm from '../../components/MuiComponent/MuiBookingDetailsPage/MuiBookingReviewForm';

function getStepContent(step, photoGrapherAddress, type,fieldsForm,myRef,userAddress,form) {
  
 
  switch (step) {
    case 0:
      return (
        <>
        <MuiDateComponent fieldsForm={fieldsForm} />
        {type === 'Studio Address' ? <PhotoGrapherAddress photoGrapherAddress={photoGrapherAddress}  form={form}/> : <MuiBookingForms ref={myRef} userAddress={userAddress} />}
        </>
        );
    case 1:
     
       return(
         type === 'Studio Address' ?<PhotoGrapherAddress step={1} photoGrapherAddress={photoGrapherAddress} form={form} />:<MuiBookingReviewForm userAddress={userAddress}  form={form}/>
       )
    case 2:
      return <BookingConfirm />;
    default:
      throw new Error('Unknown step');
  }
}
export default function PhotograherBookingPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressType, setAddressType] = React.useState('Studio Address')
  const router = useRouter()
  const [photoGrapherAddress, setPhotoGrapherAddress] = React.useState({})
  const [userAddress,setUserAddress] = React.useState({})
   
  const myRef = React.useRef()


  const {startDate,endDate,photographerId} =  router.query
  const defaultDate = {
    startDate,
    endDate,
    
  }
  
  React.useEffect(() => {
    if(photographerId){
      getSinglePhotoGrapher(photographerId)
      .then((response) => {
        setPhotoGrapherAddress(response)
      })
    }
  }, [photographerId])

  const {fieldsForm,form} = useMuiDateHook(defaultDate)

   const submit = (data)=>{
       if(data){
        setUserAddress(data)
        setActiveStep(activeStep + 1);
       }
   }
  
  const handleNext = () => {
    if(addressType==='Studio Address'){
      setActiveStep(activeStep + 1);
    }else{
      const handleSubmit = myRef.current.handleFormSubmit()
   handleSubmit(submit)()
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (

    <Layout>
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Book your photographer here !!!!
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}

                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep===0&&(<FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Address Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={addressType}
            >
              <FormControlLabel value="Studio Address" onChange={(e) => setAddressType(e.target.value)} control={<Radio />} label="Studio Address" />
              <FormControlLabel value="Personal Address" onChange={(e) => setAddressType(e.target.value)} control={<Radio />} label="Personal Address" />

            </RadioGroup>
          </FormControl>)}
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, photoGrapherAddress, addressType,fieldsForm,myRef,userAddress,form)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   const { searchText, startDate, endDate } = context.query;
  
//   return {
//     props: { startDate: '', endDate:'',  },
//   };
// }
