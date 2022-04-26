import { Button, Grid, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { ItemCard } from '../ItemCard/itemCard';
import Search from '../Search/Search';
import Horse from '../../images/horse.jpg';
import AddItemDialog from '../AddItemToFarmDialog/AddItemToFarmDialog';
import CreateEventDialog from '../CreateEventDialog/CreateEventDialog';
import AddItemToFarmDialog from '../AddItemToFarmDialog/AddItemToFarmDialog';
import { useParams } from 'react-router-dom';
const FarmItemAdder = ({close}) => {
    const [search, setSearch] = useState();
    const [avaliableItems, setAvaliableItems] = useState([
        { product_name: "Horse", product_image_url: Horse, product_description: "Typical horse you are selling, edit this product_description if you want", product_category: ["Livestock","Big"] },
        { product_name: "Pig", product_image_url: "https://i.natgeofe.com/k/6d301bfc-ff93-4f6f-9179-b1f66b19b9b3/pig-young-closeup_2x3.jpg", product_description: "Dirty, stinky", product_category: ["Livestock"] },
        { product_name: "Tractor", product_image_url: "https://media.npr.org/assets/img/2015/08/17/img_0837-bd73606901bd07df1a6caae57afd64fe781c77f1-s1100-c50.jpg", product_description: "Dirty, stinky", product_category: ["Equipment","Big"] },
        { product_name: "Pear", product_image_url: "https://www.producemarketguide.com/sites/default/files/Commodities.tar/Commodities/pears_commodity-page.png", product_description: "a Pear", product_category: ["Fruit"] },
        { product_name: "Shovel", product_image_url: "https://www.humboldtmfg.com/product-originals/_lrg@1x/H-4982.png", product_description: "Diggin", product_category: ["Equipment", "Fruit","Livestock"] },
        { product_name: "The Berserker Armor", product_image_url: "https://i.redd.it/rlazrv2gboc81.jpg", product_description: "You will most likely go Berserk", product_category: ["Equipment"] },
        { product_name: "The Dragon Slayer", product_image_url: "https://sep.yimg.com/ay/yhst-31644440917560/berserk-guts-dragon-slayer-sword-black-blade-1.gif", product_description: "Too Big, Too ROugh, not much of a sword at all, more like a giant chunk of iron", product_category: ["Equipment", "Big"] },
    ]);
    const [itemsFound, setItemsFound] = useState ([]);

    const [openAddForm, setOpenAddForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [createEvent, setCreateEvent] = useState(false);
    const params = useParams();
    useEffect(() => {
        if(search)
        {
            let filteredItems = [...avaliableItems]
            if(search.itemName) {
                filteredItems = filteredItems.filter(item => item.product_name.toLowerCase().includes(search.itemName.toLowerCase()));
            }
            for(let i = 0; i < search.filters.length; i++){
                filteredItems = filteredItems.filter(item => item.product_category.includes(search.filters[i]));
            }
            setItemsFound(filteredItems);
        } else {
            setItemsFound(avaliableItems);
        }
    },[search])

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    const addToFarm = (item) => {
        setSelectedItem(item);
        setOpenAddForm(true);
    }
    
    return (
        <div>
            
            <Search searchObject={search} setSearchObject={setSearch} justItem={true} hideSearch={true} header={'Search avaliable items'}></Search>
            <div className='btn btn-danger m-3' onClick={close}>Return to farm</div>
            <Typography variant='h5' textAlign={'center'} mt={2}>Add items to your farm</Typography>
            <Grid container
                spacing={1}
                direction="row"
                justifyContent="flex-start"
                alignItems="stretch"
                my={4}
                padding={4}
            >
                <Grid item xs={12} sm={6} md={3} lg={3} xl={2}>
                            <ItemCard product_name={"Custom Item"}
                                product_image_url={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Question_mark_grey.svg/1200px-Question_mark_grey.svg.png"}
                                product_description={"Your own Unique item"}
                                addText={"Add to farm"}
                                noDetails={true}
                                action={(item) => addToFarm({...item, custom:true})} />
                </Grid>
                {
                    itemsFound.map((item) => {
                        return <Grid key={item.product_name}item xs={12} sm={6} md={3} lg={3} xl={2}>
                            <ItemCard product_name={item.product_name}
                                product_image_url={item.product_image_url}
                                product_description={item.product_description}
                                addText={"Add to farm"}
                                noDetails={true}
                                action={(item) => addToFarm(item)} />
                        </Grid>
                    })
                }
            </Grid>
            
            { openAddForm && <AddItemToFarmDialog open={openAddForm}
                            setOpen={setOpenAddForm}
                            farmer_id={params.farmId} 
                            {...selectedItem}
                            returnToFarm={close}/>
            }
            
        </div>
    );
};

export default FarmItemAdder;