import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import BookMarkNestCollection from './collection';
import BookMarkCollection from '../bookmark/collection';
import * as userValidator from '../user/middleware';
import * as bookmarknestValidator from './middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';
import * as bookmarkutil from '../bookmark/util'

const router = express.Router();

// CHANGES NEEDED
// Add method for get bookmark by nestid
/**
 * Get all the bookmarknests by user who is logged in 
 *
 * @name GET /api/bookmarknests
 *
 * @return {BookMarkNestResponse[]} - A list of all the bookmarknests sorted in descending
 *                      order by date added
 *  * @throws {403} - If the user is not logged in
 */
/**
 * Get bookmarknests in nest specified by nestname.
 *
 * @name GET /api/bookmarknests?nestname=id
 *
 * @return {BookMarkNestResponse[]} - An array of bookmarknests created by user with id, authorId
 * @throws {400} - If nestname is not given
 * @throws {404} - If no user has given authorId i.e. not logged in 
 *
 */
router.get(
  '/',
  // async (req: Request, res: Response, next: NextFunction) => {
  //   // Check if authorId query parameter was supplied
  //   if (req.query.author !== undefined) {
  //     next();
  //     return;
  //   }
  //   const allBookMarkNests = await BookMarkNestCollection.findAll();
  //   const response = allBookMarkNests.map(util.constructBookMarkNestResponse);
  //   res.status(200).json(response);
  // },
  [
    userValidator.isUserLoggedIn,
    // userValidator.isAuthorExists,
    // bookmarknestValidator.isValidBookMarkNestViewer,

  ],
  async (req: Request, res: Response, next:NextFunction) => {
    console.log("got to the nestrouter step 1", req.query.nestname)
    if (req.query.nestname !== undefined) {
      next();
      return;
    } 
    console.log("begin execution in nest router with no nestname as query")
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const authorBookMarkNests = await BookMarkNestCollection.findAllByUserId(userId);
    console.log("finsihed fetching nests with no nestname query", authorBookMarkNests)
    const response = authorBookMarkNests.map(util.constructBookMarkNestResponse);
    console.log("proceeding with return res in nest router, final step")
    res.status(200).json(response);
  },
  [
    // bookmarknestValidator.isValidNestnameQuery,
  ],
  async (req: Request, res: Response) => {
    console.log("got to query portion of nest router if nestname is provided", typeof (req.query.nestname))
    console.log("request given in faulty patt", req.query)
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const nestId = await BookMarkNestCollection.findOneByNestName(req.query.nestname as string, userId);
    console.log("executed line 73")
    const Nestfreets = await BookMarkCollection.findAllByNestId(nestId._id.toString());
    console.log("got all info dfrom data badse ifvquery nestname is provided")
    const response = Nestfreets.map(bookmarkutil.constructBookMarkResponse);
    console.log("reached router here well, about to return data final step", Nestfreets)
    res.status(200).json(response);
  }, 
  

  // GET BOOKMARKS IN A BOOKMARK NEST
);

/**
 * Create a new bookmarknest.
 * @name POST /api/bookmarknests
 *
 * @param {string} nestname - The name of the BookMarkNest that the user is creating.
 * @return {BookMarkNestResponse} - The created bookmark
 * @throws {403} - If the user is not logged in
 * @throws {409} - If the user had already a nest with the same nestname.
 * @throws {400} - If nestname is invalid
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    bookmarknestValidator.isValidNestname,
    bookmarknestValidator.isNestnameNotAlreadyInUse,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const bookmarknest = await BookMarkNestCollection.addOne(userId, req.body.nestname);
    res.status(201).json({
      message: 'Your bookmarknest was created successfully.',
      bookmarknest: util.constructBookMarkNestResponse(bookmarknest)
    });
  }
);

/**
 * Create a new bookmark in a new bookmarknest on a Freet identified by Id.
 *
 * @name POST /api/bookmarknests/:nestname/bookmarks   
//  * /:id
 *
//  * @param {string} nestname - The name of the BookMarkNest that the user is creating.
 * @param {string} freetid - the id of the freet that the user is bookmarking
 * @return {BookMarkNestResponse} - The created bookmark
 * @throws {403} - If the user is not logged in
 * @throws {409} - If the user had already a nest with the same nestname.
 */
 router.post(
  '/:nestname/bookmarks/:freetId',
  [
    userValidator.isUserLoggedIn,
    bookmarknestValidator.isValidNestname,
    bookmarknestValidator.isNestnameNotAlreadyInUse,
    // bookmarknestValidator.isValidFreetId, // for req.body
    freetValidator.isFreetExists,

  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    console.log("req received in router", req)
    const bookmarknest = await BookMarkNestCollection.addOne(userId, req.params.nestname);
    const bookmark = await BookMarkCollection.addOne(userId, bookmarknest._id, req.params.freetId);
    res.status(201).json({
      message: 'Your bookmarknest was created successfully.',
      bookmarknest: util.constructBookMarkNestResponse(bookmarknest),
      bookmark: bookmarkutil.constructBookMarkResponse(bookmark),
    });
  }
);

/**
 * Delete a bookmarknest
 *
 * @name DELETE /api/bookmarknests/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the bookmarknest
 * @throws {404} - If the bookmarknestId is not valid
 */
router.delete(
  '/:bookmarknestId?',
  [
    userValidator.isUserLoggedIn,
    bookmarknestValidator.isBookMarkNestExists,
    bookmarknestValidator.isValidBookMarkNestModifier,
  ],
  async (req: Request, res: Response) => {
    await BookMarkCollection.deleteManybyBookMarkNestId(req.params.bookmarknestId);

    if (await bookmarknestValidator.isBookMarkNestTheRoot(req.params.bookmarknestId)){
      res.status(200).json({
        message: `All bookmarked freets were cleared from Root bookmarknest successfully.`
      });
    }
    else{
      await BookMarkNestCollection.deleteOne(req.params.bookmarknestId);
      res.status(200).json({
        message: 'Your bookmarknest and all its bookmarks was deleted successfully.'
      });
    }
  }
);


export {router as bookmarknestRouter};
