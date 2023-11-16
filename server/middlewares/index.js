import express from 'express';
import cors from 'cors';
import logger from 'morgan';

const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.json({ limit: '50mb' }));
  app.use(logger('common'));
};

export default applyMiddlewares;
