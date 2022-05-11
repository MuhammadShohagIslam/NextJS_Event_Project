function handler(req, res){
    if(req.method === "POST"){
        const eventId = req.query.eventId;
        const {email, name, comment} = req.body;
        console.log(eventId, email);
        res.status(200).json({message: "Successfully Created Comment"})
    }
    if(req.method === "GET"){
        const object = {
            email: "a",
            name: "a",
            comment: "a",
        }
        res.status(200).json({data: object});
    }
}
export default handler;