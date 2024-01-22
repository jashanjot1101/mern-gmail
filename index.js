import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import routes from './routes/route.js';
import Imap from 'imap';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const __dirname=path.resolve();
const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const imapConfig = {
    user: process.env.IMAP_USERNAME,
    password: process.env.IMAP_PASSWORD,
    host: process.env.IMAP_HOST,
    port: 993, 
   //tls : { rejectUnauthorized: false }, Assuming IMAP with TLS
    //timeout:30000,
};

app.post('/send-email', async (req, res) => {
    try {
        const { to, from, subject, body,date,image,name,starred,type } = req.body;

        const imap = new Imap(imapConfig);

        await imap.once('ready', async () => {
            await imap.openBox('outbox'); // Adjust mailbox name if needed

            const message = {
                from,
                to,
                subject,
                body,
                date,
                image,
                name,
                starred,
                type

                // Optionally add HTML body and attachments using node-imap methods
            };

            const rawMessage = await imap.createMessage(message); // Construct MIME message

            await imap.append('outbox', rawMessage, { flags: ['\\Seen'] });

            await imap.end();

            res.json({ message: 'Email sent successfully' });
        });

        imap.once('error', error => {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        });

        imap.connect();
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.use('/', routes);

app.use(express.static(path.join(__dirname,"./client/build")))
app.get('*',function(_,res){
    res. sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
        res.status(500).send(err);
    })
})
const PORT =process.env.PORT || 8000;

Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
