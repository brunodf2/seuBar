import { Request, Response } from "express";

import { getRepository } from "typeorm";
import Bar from "../models/Bar";

export default {
  async index(req: Request, res: Response) {
    const barRepository = getRepository(Bar);

    const bares = await barRepository.find();

    return res.json(bares);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const barRepository = getRepository(Bar);

    const bar = await barRepository.findOneOrFail(id);

    return res.json(bar);
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      sobre,
      horario_de_funcionamento,
      aberto,
    } = req.body;

    const barRepository = getRepository(Bar);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const bar = barRepository.create({
      name,
      latitude,
      longitude,
      sobre,
      horario_de_funcionamento,
      aberto,
      images,
    });

    await barRepository.save(bar);

    return res.status(201).json(bar);
  },
};
