import express from "express";
import { OwnerController } from "../controllers/owner";

const router = express.Router();
const owner = new OwnerController();

router.get('/restaurantList', owner.getRestaurantsList);
router.get('/restaurantData/:id', owner.getRestaurantData);
router.post('/login', owner.shopLogin);
router.get('/userData/:id', owner.getLoggedInUserData);
router.post('/createCategory', owner.createCategory);
router.patch('/addMoreItems/:id', owner.addMoreItemsInCategory);
router.patch('/updateItemInMenu/:id', owner.updateMenuItemNameAndPrice);
router.delete('/deleteCategory/:id', owner.deleteCategory);
router.delete('/deleteItem/:id', owner.deleteItem);

export {router};