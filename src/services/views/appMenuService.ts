import {
  mainMenuModel,
  INestedMenuItem,
  IMenu
} from '../../db/models/appStructure'
import { Query } from 'mongoose'


async function getAllMenuItems () {
  const menu: IMenu <INestedMenuItem>[] = await mainMenuModel.find({})
  return menu
}

export {
  getAllMenuItems
}