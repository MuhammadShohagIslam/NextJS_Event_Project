import { db_connection, inserting_data } from "../../helper/db_utils";

async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;
        if (!email || !email.includes("@")) {
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
                email: email,
            });
            res.status(201).json({
                message: "Sign Up!",
            });
            client.close();
        } catch (error) {
            res.status(500).json({ message: "Inserted Data Failed!" });
            return;
        }
    }
}
export default handler;
