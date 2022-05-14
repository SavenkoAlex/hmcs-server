import {
  model,
  Schema,
} from 'mongoose'

interface IMenuItem {
  label: string,
  path: string,
  icon: string | null,
}

interface INestedMenuItem extends IMenuItem {
  children: IMenuItem[] | null
}

interface IMenu <T extends IMenuItem> {
  menuItems: [T]
}

const menuItemSchema = new Schema <INestedMenuItem> ({
  label: {
    type: String,
    unique: true
  },
  path: {
    type: String,
    match: /^\/(.*\/?)/
  },
  icon: String,
})

menuItemSchema.add({children: [menuItemSchema]})

const mainMenuSchema = new Schema <IMenu <INestedMenuItem>> ({
  menuItems: [menuItemSchema]
})

const quickMenuSchema = new Schema <IMenu<IMenuItem>> ({
  menuItems: [menuItemSchema]
})

const mainMenuModel = model <IMenu <INestedMenuItem>> ('mainMenu', mainMenuSchema)
const quickMenuModel = model <IMenu <IMenuItem>> ('quickMenu', quickMenuSchema)

export {
  mainMenuModel,
  quickMenuModel,
  IMenuItem,
  INestedMenuItem,
  IMenu
}