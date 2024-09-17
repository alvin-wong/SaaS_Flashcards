'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, getDoc, getDocs, doc } from "firebase/firestore"
import { Container, Box, Typography, Paper, DialogActions, TextField, Button, Grid, Card, DialogContentText, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { db } from "@/firebase"
import { useSearchParams } from "next/navigation"

export default function FlashCard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashCards, setFlashCards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')


    useEffect(() => {
        async function getFlashCard(){
            if(!search || !user) return
            
            const docRef = collection(doc(collection(db,'users'), user.id),search)
            const docs = await getDocs(docRef)
            const flashCards = []

            docs.forEach((doc) =>{
                flashCards.push({id: doc.id, ...doc.data()})
            })
            setFlashCards(flashCards)
        }
        getFlashCard()
    }, [user, search])

    if(!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
    
    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                            {flashCards.map((flashCard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
                                                },
                                                '& > div > div': {
                                                    position: "absolute",
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: "hidden",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    padding: 2,
                                                    boxSizing: 'border-box'
                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)'
                                                }
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div">{flashCard.front}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">{flashCard.back}</Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Grid>
                            ))}
            </Grid>
        </Container>
    )
}