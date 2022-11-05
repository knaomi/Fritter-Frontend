import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import DownFreetCollection from './collection';
import * as userValidator from '../user/middleware';
import * as downfreetValidator from './middleware';
import * as freetValidator from '../freet/middleware';
// Import * as likeValidator from '../like/middleware';
// import LikeCollection from '../like/collection';
import * as util from './util';

// TODO: RETURN THE EXPIRATION THING ONCE FREET HAS IT TOO
// RETURN THE LIKECOLLECTION ONCE LIKE IS IMPLEMENTED TOO

const router = express.Router();

/**
 * Get all the downfreets for user signed in
 *
 * @name GET /api/downfreets
 *
 * @return {DownFreetResponse[]} - A list of all the downfreets sorted in descending
 *                      order by date added
 * @throws {403} - If the user is not logged in
 */
/**
 * Get downfreets by author.
 *
 * @name GET /api/downfreets?authorId=id
 *
 * @return {DownFreetResponse[]} - An array of downfreets created by user with id, authorId
 * @throws {400} - If authorId is not given
 * @throws {404} - If no user has given authorId
 *
 */

/**
 * Get (number of) downfreets on freet.
 *
 * @name GET /api/downfreets?freetId=id
 *
 * @return {Array<HydratedDocument<DownFreet>>} - (Number of) downfreets created on freet with id, freetId
 * @throws {400} - If freetId is not given
 * @throws {404} - If no freet has given freetId
 *
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorId query parameter was supplied
    if (req.query.author !== undefined || req.query.freet !== undefined) {
      next();
      return;
    }

    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const authorDownFreets = await DownFreetCollection.findAllByUserId(userId);
    const response = authorDownFreets.map(util.constructDownFreetResponse);
    res.status(200).json(response);
  },
  [
    downfreetValidator.isAuthorExists
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.freet !== undefined) {
      next();
      return;
    }

    const authorDownFreets = await DownFreetCollection.findAllByUsername(req.query.author as string);
    const response = authorDownFreets.map(util.constructDownFreetResponse);
    res.status(200).json(response);
  },
  [
    freetValidator.isFreetQueryExists
  ],
  async (req: Request, res: Response) => {
    const freetDownFreets = await DownFreetCollection.findAllbyFreetId(req.query.freet as string);
    res.status(200).json(freetDownFreets);
  }
);

/**
 * Create a new downfreet.
 *
 * @name POST /api/downfreets
 *
 * @param {string} freetid - The freet that the user is downFreeting
 * @return {DownFreetResponse} - The created downfreet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the user had already added a downFreet on the Freet
 * @throws{404} - If the freetid does not exist.
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    downfreetValidator.isValidFreetId,
    downfreetValidator.isUserAlreadyDownFreeting
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const downfreet = await DownFreetCollection.addOne(userId, req.body.freetid);
    // Const likeOnFreet = await LikeCollection.findOneByFreetId(req.body.freetid, userId);
    // if (likeOnFreet){
    //   await LikeCollection.deleteOne(likeOnFreet._id);
    //   res.status(201).json({
    //     message: 'Downfreet was created successfully and \n' +
    //       'Your previous like was canceled successfully by downfreet',
    //   });
    // }
    // VALID CODE , DO NOT DELETE UNCOMMENTED OUT CODE SINCE IT WILL BE USED BY LIKE
    // else{
    res.status(201).json({
      message: 'Your downfreet was created successfully.',
      downfreet: util.constructDownFreetResponse(downfreet)
    });
    // } // UNCOMMENT OUT THE ELSE ONCE LIKE IS IMPLEMENTED
  }
);

/**
 * Delete a downfreet
 *
 * @name DELETE /api/downfreets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the downfreet
 * @throws {404} - If the downfreetId is not valid
 */
router.delete(
  '/:downfreetId?',
  [
    userValidator.isUserLoggedIn,
    downfreetValidator.isDownFreetExists,
    downfreetValidator.isValidDownFreetModifier
  ],
  async (req: Request, res: Response) => {
    await DownFreetCollection.deleteOne(req.params.downfreetId);
    // Await DownFreetCollection.deleteManybyExpiration();
    res.status(200).json({
      message: 'Your downfreet was deleted successfully.'
    });
  }
);

export {router as downfreetRouter};
