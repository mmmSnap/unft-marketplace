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
import ReviewDetails from '../../components/MuiComponent/MuiBookingDetailsPage/reviewDetails';
import BookingConfirm from '../../components/MuiComponent/MuiBookingDetailsPage/bookingConfirm';
import MuiBookingDetailsPage from '../../components/MuiComponent/MuiBookingDetailsPage/MuiBookingDetailsPage'

const steps = ['Select or Enter Address Type', 'Review Booking details', 'Booking Confirmation Details'];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <MuiBookingDetailsPage />;
    case 1:
      return <ReviewDetails />;
    case 2:
      return <BookingConfirm />;
    default:
      throw new Error('Unknown step');
  }
}
export default function PhotograherBookingPage() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
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
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Address Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Studio Address" />
              <FormControlLabel value="male" control={<Radio />} label="Personal Address" />

            </RadioGroup>
          </FormControl>
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
              {getStepContent(activeStep)}
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
