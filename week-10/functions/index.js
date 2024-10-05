/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

// const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");

admin.initializeApp();

exports.capitaliseBooks =
    onDocumentWritten("/books/{bookId}", async (event) => {
      const newValue = event.data.after.data();
      console.log(newValue);
      const bookId = event.params.bookId;

      if (!newValue) {
        console.error("No data found for the document.");
        return null;
      }

      const capitalisedData = {
        isbn: String(newValue.isbn || "").toUpperCase(),
        name: (newValue.name || "").toUpperCase(),
      };

      try {
        await admin.firestore().collection("books")
            .doc(bookId).update(capitalisedData);

        console.log(`Book ${bookId} capitalised successfully.`);
      } catch (error) {
        console.error("Error capitalising book data: ", error);
      }

      return null;
    });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = snapshot.docs.map((doc) => doc.data());
      res.status(200).json({books});
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).send("Error fetching books");
    }
  });
});
