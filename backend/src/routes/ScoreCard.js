import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();

router.delete("/cards",async(_,res)=>{
    try{
        await ScoreCard.deleteMany({});
        res.json({message:'Database cleared'});
    }catch(error){
        res.json({message:'Database Connection Problem'});
    }
});
router.post("/card",async(req,res)=>{
    try{
        const {name,subject,score} = req.body;
        const existing = await ScoreCard.findOne({name:name,subject:subject});
        if(existing){
            await ScoreCard.updateOne({name:name,subject:subject},{score:score});
            const userInfo = await ScoreCard.find({name:name});
            res.json({message:'Updating(' + name + ',' + subject + ',' + score + ')',card:true,messages:JSON.stringify(userInfo)});
        }else{
            const newScoreCard = new ScoreCard({name,subject,score});
            await newScoreCard.save();
            const userInfo = await ScoreCard.find({name:name});
            res.json({message:'Adding(' + name + ',' + subject + ',' + score + ')',card:true,messages:JSON.stringify(userInfo)});
        }
    }catch(error){
        res.json({message:'Database Connection Problem'});
    }
});
router.get("/cards",async(req,res)=>{
    try{
        const {type,queryString} = req.query;
        const existing = await ScoreCard.find({[type]:queryString});
        if(existing.length != 0){
            res.json({messages:JSON.stringify(existing)});
        }else{
            res.json({message:type + '(' + queryString + ') not found!'});
        }
    }catch(error){
        res.json({message:'Database Connection Problem'});
    }
});
export default router;
