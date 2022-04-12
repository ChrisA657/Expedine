import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ItemCard } from '../ItemCard/itemCard';

import './farmCard.css'
export const FarmCard = ({ farm }) => {

    return (
        <>
            <div className="text-center fs-4 fw-bold mb-3">{farm.farmName}</div>
            <Grid container
                justifyContent={["center","space-between"]}>
                <Grid item sm={8} md={8}>
                    <Typography component={'span'}>
                        <div className="farm-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Obcaecati culpa aliquid expedita,
                            repudiandae suscipit omnis ratione recusandae
                            dicta laudantium atque dolores laboriosam ipsa delectus fugiat. Obcaecati ex similique dolores adipisci?
                            {farm.farmDescription}
                        </div>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={4} justifyContent={"flex-end"}>
                    <img src={farm.farmImage} id="farm-img" alt={farm.farmName}/>
                </Grid> 

            </Grid>
            <Grid container textAlign={"center"}>
                
                <Typography fontWeight={"bold"} mt={4} mb={2} textAlign={"center"}>
                        Items for sale
                </Typography>
                <Grid container
                    spacing={1}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    mb={4}
                >
                    {
                        farm.items.map((item, index) => {
                            return index < 6 ? 
                            <Grid item xs={6} sm={4} md={2} lg={2} key={index} maxWidth={["100%"]}>
                                <ItemCard name={item.name}
                                    description={item.description}
                                    image={item.image}
                                    price={item.price}
                                    stock={item.stock}
                                    addText={"Add to cart"} />
                            </Grid> : null
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}