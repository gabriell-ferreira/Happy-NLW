import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response){
    try {
      const orphanageRepository = getRepository(Orphanage);

      const orphanages = await orphanageRepository.find({
        relations: ['images']
      });

      return res.json(orphanageView.renderMany(orphanages));

    } catch (error) {
      return res.json({ message: 'Error on list orphanages' })
    }
    
  },

  async show(req: Request, res: Response){
    try {
      const { id } = req.params;

      const orphanageRepository = getRepository(Orphanage);

      const orphanage = await orphanageRepository.findOneOrFail(id, {
        relations: ['images']
      });

      return res.json(orphanageView.render(orphanage));

    } catch (error) {
      return res.json({message: 'Orphanage not found'});
    }

  },

  async create(req: Request, res: Response) {
    
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;
  
    const orphanageRepository = getRepository(Orphanage);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    })

    await schema.validate(data, {
      abortEarly: false,

    })
  
    const orphanage = orphanageRepository.create(data);
  
    await orphanageRepository.save(orphanage);
  
    return res.status(201).json(orphanage);
  }
}