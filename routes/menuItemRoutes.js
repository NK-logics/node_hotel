const express = require('express')
const MenuItem = require('../models/menu.js')
const router = express.Router() 


router.post('/', async (req,res)=>{
    try{

        const data = req.body;
        const menu = new MenuItem(data);
        
        const response = await menu.save();
        res.status(200).json(response);
        console.log('Data saved successfully');
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})


router.get('/', async (req, res)=>{
    try{

        const menuItems = await MenuItem.find();
        console.log("Data fetched successfull");
        res.status(200).json(menuItems);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server error'})
    }
})


router.get('/:taste', async (req, res)=>{

    try{

        const menuTaste = req.params.taste;
        if(menuTaste == 'Spicy' || menuTaste == 'Sweet' || menuTaste == 'Sour' )
        {
            const response = await MenuItem.find({taste: menuTaste})
            console.log('Data Fetched');
            res.status(200).json(response);
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }

})


router.put('/:menuId' , async(req, res)=>{

    try{

        const menuId = req.params.menuId;
        const updatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId , updatedMenuData, {
            new: true, 
            runValidators: true,
        })

        if(!response)
        {
            return res.status(404).json({ error: 'Menu not found'})
        }
        console.log("Menu Updated");

        res.status(200).json(response);

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }
})

router.delete('/:menuId', async (req,res)=>{
    
    try{
        
        const menuid = req.params.menuId;

        const response = await MenuItem.findByIdAndDelete(menuid)

        if(!response)
        {
            return res.status(404).json({error : 'Menu not found'})
        }

        console.log('Data deleted');
        res.status(200).json({message: 'Menu Deleted successfully'});

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server error'})
    }

})

module.exports = router;
