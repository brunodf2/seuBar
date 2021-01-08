import { Request, Response } from "express";
import * as Yup from "yup";

import { getRepository } from "typeorm";
import Bar from "../models/Bar";
import barView from "../views/bares_view";

export default {
  async index(req: Request, res: Response) {
    const barRepository = getRepository(Bar);

    const bares = await barRepository.find({
      relations: ["images"],
    });

    return res.json(barView.renderMany(bares));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const barRepository = getRepository(Bar);

    const bar = await barRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(barView.render(bar));
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

    const data = {
      name,
      latitude,
      longitude,
      sobre,
      horario_de_funcionamento,
      aberto,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      sobre: Yup.string().required().max(300),
      horario_de_funcionamento: Yup.string().required().max(300),
      aberto: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const bar = barRepository.create(data);

    await barRepository.save(bar);

    return res.status(201).json(bar);
  },
};
