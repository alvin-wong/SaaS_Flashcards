import Image from "next/image";
import getStripe from "@/utils/get-stripe"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, Toolbar, AppBar, Typography, Button, Box, Grid} from "@mui/material";
import Head from "next/head";


export default function Home() {

  const handleSubmit = async() => {
    const checkoutSession = await fetch('api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000'
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if(checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if(error) {
      console.warn(error.message)
    }
  }





  return (
    <Container maxWidth="100vw" style={{ padding: 0, margin: 0 }}>
      <Head>
        <title>Flash Card SaaS</title>
        <meta name = "description" content="Create flashcard from your text"></meta>
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Log In</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign:"center", my:4}}>
        <Typography variant="h2" gutterBottom>Welcome to Flash Card SaaS!</Typography>
        <Typography variant="h5" gutterBottom>{' '}The easiest way to make flashcards from your text!</Typography>
        <Button variant="contained" color="primary" sx={{mt:2}}>Get Started</Button>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant="h4" components="h2" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>{' '}Simply input your text and let our software do the rest! Creating flashcards has never been easier</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flash Cards</Typography>
            <Typography>{' '}Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>{' '}Access your flashcards anywhere! Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>
      
      
      <Box sx={{my:6}} textAlign="center">
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{p:3,border:'1px solid', borderColor:"grey", borderRadius:2}}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 Per Month</Typography>
              <Typography>{' '}Access to basic flash card features and limited storage</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{p:3,border:'1px solid', borderColor:"grey", borderRadius:2}}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 Per Month</Typography>
              <Typography>{' '}Unlimited flashcards and storage with priority support</Typography>
              <Button variant="contained" color="primary" sx={{mt:2}}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
