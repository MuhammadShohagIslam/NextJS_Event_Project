function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;
        console.log(email);
        res.status(200).json({ message: "Successfully Created" });
    }
}
export default handler;
