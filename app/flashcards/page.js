'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"

import { collection, getDoc, setDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter} from "next/navigation"
import { Container, Box, Typography, Paper, DialogActions, TextField, Button, Grid, Card, DialogContentText, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent} from "@mui/material"


export default function FlashCard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashCards, setFlashCards] = useState([])
    const router = useRouter()
    
    useEffect(() => {
        async function getFlashCards(){
            if(!user) return
            
            const docRef = doc(collection(db,'users'), user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                const collections = docSnap.data().flashCards || []
                console.log(collections)
                setFlashCards(collections)
            } else {
                await setDoc(docRef, {flashCards: []})
            }
        }
        getFlashCards()
    }, [user])

    if(!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{mt:3}}>
                {flashCards.map((flashCard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashCard.name)}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {flashCard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}