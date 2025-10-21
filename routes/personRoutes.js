const express = require('express')
const Person = require('./../models/person.js')
const router = express.Router()

router.post('/', async (req , res)=>{

    try{
        
        const data = req.body;
 
        const newPerson = new Person(data);

        const response = await newPerson.save()
        console.log("Data Saved");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }

})


router.get('/', async (req,res)=>{
    try{
        const person_data = await Person.find();
        console.log("Data fetched")
        res.status(200).json(person_data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error : 'Internal Server error'})
    }
})


router.get('/:worktype', async(req, res)=>{
    try{

        const worktype = req.params.worktype;
        if(worktype=='chef' || worktype=='waiter' || worktype=='manager')
        {
            const response = await Person.find({work: worktype})
            console.log("Data fetched")
            res.status(200).json(response)
        }
        else
        {
            res.status(404).json({error: 'invalid worktype'})
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error : 'Internal Server error'})
    }
})


router.put('/:id' , async (req, res)=>{
    try{

        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId , updatedPersonData ,{
            new: true, 
            runValidators: true,
        } )

        if (!updatedPersonData) {
            return res.status(404).json({ error: 'Person not found'})
        }
 
        console.log('Response Updated')
        res.status(200).json(response)

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error : 'Internal Server error'})
    }
})



router.delete('/:personId' , async (req, res)=>{
    
    try{

        const personId = req.params.personId;

        const response = await Person.findByIdAndDelete(personId);

        if(!response) 
        {
            return res.status(404).json({error : 'Person not found'})
        }
        console.log("Data deleted")
        res.status(200).json({message : 'Person deleted successfully'})

    }catch(err)
    {
        console.log(err);
        res.status(500).json({error : 'Internal Server error'})
    }
})


module.exports = router;



