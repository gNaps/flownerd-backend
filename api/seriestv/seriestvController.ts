import { Request, Response } from "express";
import { seriesTvFilters } from "../../model/SeriesTv";
import { seriesTvService } from "./seriestvService";

const searchSeriesTv = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { name, year }: seriesTvFilters = request.query;
  const videogames = await seriesTvService.searchSeriesTv({
    name,
    year,
  });

  response.status(200).json(videogames);
};

const searchSeriesTvById = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const serietv = await seriesTvService.searchSeriesTvById(+id);

  if (serietv && serietv.length > 0) {
    const flownerdInfo = await seriesTvService.getSeriestvByExternalId(
      serietv[0].id,
      request.CurrentUser.id
    );

    const serietvData = serietv.map((v: any) => {
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

    response.status(200).json(serietvData);
  } else {
    response.status(200).json(serietv);
  }
};

const getSeriestv = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { name, year }: seriesTvFilters = request.query;
  const videogames = await seriesTvService.getSeriestv(request.CurrentUser.id, {
    name,
    year,
  });

  response.status(200).json(videogames);
};

const getSeriestvByUser = async (request: Request, response: Response) => {
  const { name, year }: seriesTvFilters = request.query;
  const { id } = request.params;
  const seriestv = await seriesTvService.getSeriestv(+id, {
    name,
    year,
  });

  response.status(200).json(seriestv);
};

const addSerietv = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const user = request.CurrentUser;
  const { id } = request.params;
  const { status } = request.body;
  const videogameCreated = await seriesTvService.addSerietv(+id, user, status);
  response.status(200).json(videogameCreated);
};

const removeSerietv = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const permission = await seriesTvService.canModifyCollections(
    +id,
    request.CurrentUser.id
  );

  if (permission) {
    const seriesRemoved = await seriesTvService.removeSerietv(+id);
    response.send(200).json(seriesRemoved);
  } else {
    response.sendStatus(403);
  }
};

const updateSerietv = async (
  request: Request & { CurrentUser?: any },
  response: Response
) => {
  const { id } = request.params;
  const { status } = request.body;
  const permission = await seriesTvService.canModifyCollections(
    +id,
    request.CurrentUser.id
  );

  if (permission) {
    const serieTvUpdated = await seriesTvService.updateSerietv(+id, status);
    response.status(200).json(serieTvUpdated);
  } else {
    response.sendStatus(403);
  }
};

export const seriesTvController = {
  searchSeriesTv,
  searchSeriesTvById,
  getSeriestv,
  getSeriestvByUser,
  addSerietv,
  updateSerietv,
  removeSerietv,
};
