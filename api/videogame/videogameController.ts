import { Request, Response } from "express";
import { videogameFilters } from "../../model/Videogames";
import { videogameService } from "./videogameService";

const getVideogames = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { name, platform, year }: videogameFilters = request.query;
  const videogames = await videogameService.getVideogames(
    request.CurrentUser.id,
    {
      name,
      platform,
      year,
    }
  );

  response.status(200).json(videogames);
};

const getVideogamesByUser = async (request: Request, response: Response) => {
  const { name, platform, year }: videogameFilters = request.query;
  const { id } = request.params;
  const videogames = await videogameService.getVideogames(+id, {
    name,
    platform,
    year,
  });

  response.status(200).json(videogames);
};

const searchVideogames = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { name, platform, year }: videogameFilters = request.query;
  const videogames = await videogameService.searchVideogames({
    name,
    platform,
    year,
  });

  response.status(200).json(videogames);
};

const getVideogameById = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const videogame = await videogameService.getVideogameById(+id!);
  response.status(200).json(videogame);
};

const searchVideogameById = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const videogame = await videogameService.searchVideogameById(+id!);

  if (videogame && videogame.length > 0) {
    const flownerdInfo = await videogameService.getVideogameByExternalId(
      videogame[0].id,
      request.CurrentUser.id
    );

    const videogameData = videogame.map((v: any) => {
      return flownerdInfo?.id
        ? {
            ...v,
            isInCollection: true,
            ...flownerdInfo,
          }
        : {
            ...v,
            isInCollection: false,
          };
    });

    response.status(200).json(videogameData);
  } else {
    response.status(200).json(videogame);
  }
};

const addVideogame = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const user = request.CurrentUser;
  const { id } = request.params;
  const { status } = request.body;
  const videogameCreated = await videogameService.addVideogame(
    +id,
    user,
    status
  );
  response.status(200).json(videogameCreated);
};

const removeVideogame = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const permission = await videogameService.canModifyCollections(
    +id,
    request.CurrentUser.id
  );

  if (permission) {
    const videogameCreated = await videogameService.removeVideogame(+id);
    response.send(200).json(videogameCreated);
  } else {
    response.sendStatus(403);
  }
};

const updateVideogame = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const { status } = request.body;
  const permission = await videogameService.canModifyCollections(
    +id,
    request.CurrentUser.id
  );

  if (permission) {
    const videogameCreated = await videogameService.updateVideogame(
      +id,
      status
    );
    response.status(200).json(videogameCreated);
  } else {
    response.sendStatus(403);
  }
};

export const videogameController = {
  getVideogames,
  getVideogameById,
  searchVideogames,
  searchVideogameById,
  addVideogame,
  removeVideogame,
  updateVideogame,
  getVideogamesByUser,
};
