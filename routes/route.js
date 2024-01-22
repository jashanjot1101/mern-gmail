import express from 'express';

import { saveSendEmails, getEmails, toggleStarredEmail, deleteEmails, 
    moveEmailsToBin,signup,login } from '../controller/email-controller.js';
import { authenticateUser } from '../model/Auth.js';
const routes = express.Router();
routes.post('/signup', signup);
routes.post('/login', login);

routes.post('/save', authenticateUser, saveSendEmails);
routes.post('/save-draft', authenticateUser, saveSendEmails);
routes.get('/emails/:type', getEmails);
routes.post('/starred', toggleStarredEmail);
routes.delete('/delete', deleteEmails);
routes.post('/bin', moveEmailsToBin);

export default routes;