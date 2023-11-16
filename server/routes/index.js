import express from 'express';
import path from 'path';

import app from '../config/express';
import Cards from './cards';

app.use('/api/v1/cards', Cards);

const distPath = path.join(__dirname, '../../dist/client');
app.use(express.static(distPath));
app.get('*', (_, res) => res.sendFile(path.join(distPath, 'index.html')));
