import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FreetDraftCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetdraftValidator from '../freetdraft/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the freetdrafts for author signed in; sorted in descending
 *                      order by date modified
 *
 * @name GET /api/freetdrafts
 *
 * @return {FreetDraftResponse[]} - A list of all the freetdrafts sorted in descending
 *                      order by date modified
 *
 *  * @throws {403} - If user is not logged in
 */


router.get(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const authorFreetDrafts = await FreetDraftCollection.findAllByAuthorId(userId);
    const response = authorFreetDrafts.map(util.constructFreetDraftResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new freetdraft.
 *
 * @name POST /api/freetdrafts
 *
 * @param {string} content - The content of the freetdraft
 * @return {FreetDraftResponse} - The created freetdraft
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freetdraft content is empty or a stream of empty spaces
 * @throws {413} - If the freetdraft content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    freetdraftValidator.isValidFreetDraftContent
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const freetdraft = await FreetDraftCollection.addOne(userId, req.body.content);

    res.status(201).json({
      message: 'Your freetdraft was created successfully.',
      freetdraft: util.constructFreetDraftResponse(freetdraft)
    });
  }
);

/**
 * Delete a freetdraft
 *
 * @name DELETE /api/freetdrafts/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freetdraft //PROBABLY OMIT THE AUTHOR SINCE ONE CAN ONLY VIEW THEIR OWN DRAFTS
 * @throws {404} - If the freetdraftId is not valid
 */
router.delete(
  '/:freetdraftId?',
  [
    userValidator.isUserLoggedIn,
    freetdraftValidator.isFreetDraftExists,
    freetdraftValidator.isValidFreetDraftModifier
  ],
  async (req: Request, res: Response) => {
    await FreetDraftCollection.deleteOne(req.params.freetdraftId);
    res.status(200).json({
      message: 'Your freetdraft was deleted successfully.'
    });
  }
);

/**
 * Modify a freetdraft (the contents)
 *
 * @name PATCH /api/freetdrafts/:id
 *
 * @param {string} content - the new content for the freetdraft
 * @return {FreetDraftResponse} - the updated freetdraft
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freetdraft
 * @throws {404} - If the freetdraftId is not valid
 * @throws {400} - If the freetdraft content is empty or a stream of empty spaces
 * @throws {413} - If the freetdraft content is more than 140 characters long
 */
router.put(
  '/:freetdraftId?',
  [
    userValidator.isUserLoggedIn,
    freetdraftValidator.isFreetDraftExists,
    freetdraftValidator.isValidFreetDraftModifier, 
    freetdraftValidator.isValidFreetDraftContent
  ],
  async (req: Request, res: Response) => {
    const freetdraft = await FreetDraftCollection.updateOne(req.params.freetdraftId, req.body.content);
    res.status(200).json({
      message: 'Your freetdraft was updated successfully.',
      freetdraft: util.constructFreetDraftResponse(freetdraft)
    });
  }
);

/**
 * Publish a freet draft on Fritter
 * 
 * @name POST /api/freetdrafts/scheduledfreets/ id
 * 
 */


export {router as freetdraftRouter};
