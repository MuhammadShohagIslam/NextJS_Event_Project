import {
    db_connection,
    get_all_comment,
    inserting_data,
} from "../../../helper/db_utils";

async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;
    try {
        client = await db_connection();
    } catch (error) {
        res.status(500).json({ message: "Server Connection Is Failed!" });
        return;
    }

    if (req.method === "POST") {
        const { email, name, comment } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !comment ||
            comment.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid Input!" });
            return;
        }
        const newComment = {
            email,
            name,
            comment,
            eventId,
        };
        let result;
        try {
            result = await inserting_data(client, "comments", newComment);
            newComment._id = result.insertedId;

            res.status(201).json({
                message: "successfully comment!",
                comment: newComment,
            });
        } catch (error) {
            res.status(500).json({ message: "Inserted Data Failed!" });
            return;
        }
    }

    if (req.method === "GET") {
        try {
            const comments = await get_all_comment(
                client,
                "comments",
                { eventId: eventId },
                { _id: -1 }
            );
            res.status(201).json({
                comments,
            });
        } catch (error) {
            res.status(500).json({ message: "Getting All comment Failed!" });
            return;
        }
    }
    client.close();
}
export default handler;
