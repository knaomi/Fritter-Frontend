import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import BookMarkCollection from './collection';
import * as userValidator from '../user/middleware';
import * as bookmarkValidator from './middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';
import UserCollection from '../user/collection';
import * as freetutil from '../freet/util';
import FreetCollection from '../freet/collection';


const router = express.Router();

/**
 * Get all the bookmarks (by user signed in)
 *
 * @name GET /api/bookmarks
 *
 * @return {BookMarkResponse[]} - A list of all the bookmarks sorted in descending
 *                      order by date added
 * * @throws {403} - If user is not logged in
 */

//  */
// /**
//  * Get bookmarks by author.
//  *
//  * @name GET /api/bookmarks?authorId=id
//  *
//  * @return {BookMarkResponse[]} - An array of bookmarks created by user with id, authorId
//  * @throws {400} - If authorId is not given
//  * @throws {404} - If no user has given authorId

/**
 * Get the number of all bookmarks on a freetid
 * 
 * @name get /api/bookmarks/:id
 * 
 * @return 
 */
 
 router.get(
  '/',
  // async (req: Request, res: Response, next: NextFunction) => {
  //   // Check if authorId query parameter was supplied
  //   if (req.query.author !== undefined) {
  //     next();
  //     return;
  //   }
  //   const allBookMarks = await BookMarkCollection.findAll();
  //   const response = allBookMarks.map(util.constructBookMarkResponse);
  //   res.status(200).json(response);
  // },
  [
    userValidator.isUserLoggedIn,
    // userValidator.isAuthorExists,
    // bookmarkValidator.isValidBookMarkViewer,
  ],
  async (req: Request, res: Response) => {
    //ADD QUERY CHECK gor nest id is not undefined
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const authorBookMarks = await BookMarkCollection.findAllByUserId(userId);
    // const response = authorBookMarks.map(util.constructBookMarkResponse);
    // console.log("got bookmakrs", authorBookMarks)
    const freets = await Promise.all(authorBookMarks.map(item => FreetCollection.findOne(item.originalFreet._id)));
    // console.log("got equivalent freets in router", freets)
    const response = freets.map(freetutil.constructFreetResponse);
    // console.log("constructed response new one", response)
    res.status(200).json(response);
  },
);


/**
 * Create a new bookmark.
 *
 * @name POST /api/bookmarks
 *
 * @param {string} freetid - The freet that the user is bookMarking
 * @return {BookMarkResponse} - The created bookmark
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the user had already added a bookMark on the Freet
 * @throws{404} - If the freetid does not exist.
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    bookmarkValidator.isValidFreetId,
    bookmarkValidator.isUserAlreadyBookMarking,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const bookmark = await BookMarkCollection.addOne(userId, req.body.freetid);

    res.status(201).json({
      message: 'Your bookmark was created successfully.',
      bookmark: util.constructBookMarkResponse(bookmark)
    });
  }
);

/**
 * Delete a bookmark
 *
 * @name DELETE /api/bookmarks/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the bookmark
 * @throws {404} - If the bookmarkId is not valid
 */
// router.delete(
//   '/:bookmarkId?',
//   [
//     userValidator.isUserLoggedIn,
//     bookmarkValidator.isBookMarkExists,
//     bookmarkValidator.isValidBookMarkModifier
//   ],
//   async (req: Request, res: Response) => {
//     await BookMarkCollection.deleteOne(req.params.bookmarkId.toString());
//     // await BookMarkCollection.deleteManybyExpiration();
//     res.status(200).json({
//       message: 'Your bookmark was deleted successfully.'
//     });
//   }
// );
router.delete(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    bookmarkValidator.isBookMarkExists,
    // bookmarkValidator.isValidBookMarkModifier
    freetValidator.isFreetExists,
  ],
  async (req: Request, res: Response) => {
    // await BookMarkCollection.deleteOne(req.params.bookmarkId);
    const userId = (req.session.userId as string) ?? '';
    await BookMarkCollection.deleteOnebyFreetID(req.params.freetId, userId);
    // await BookMarkCollection.deleteManybyExpiration();
    res.status(200).json({
      message: 'Your bookmark was deleted successfully.'
    });
  }
);


export {router as bookmarkRouter};