import { db_connection, inserting_data } from "../../helper/db_utils";

async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;
        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid Email Address" });
            return;
        }

        let client;
        try {
            client = await db_connection();
        } catch (error) {
            res.status(500).json({ message: "Server Connection Is Failed!" });
            return;
        }
        try {
            await inserting_data(client, "newsletter", {
                email: userEmail,
            });
            client.close();
        } catch (error) {
            res.status(500).json({ message: "Inserted Data Failed!" });
            return;
        }
        res.status(201).json({ message: "SignUp..." });
    }
}
export default handler;
