import {
  model,
  Schema,
} from 'mongoose'

interface IMenuItem {
  label: string,
  path: string,
  icon: string,
  authNeeded: boolean
}

interface INestedMenuItem extends IMenuItem {
  children: IMenuItem[] | null
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
  authNeeded: {
    type: Boolean,
    default: false
  }
})

menuItemSchema.add({children: [menuItemSchema]})

const mainMenuSchema = new Schema <INestedMenuItem[]> ({
  menuItems: [menuItemSchema]
})

const quickMenuSchema = new Schema <IMenuItem[]> ({
  menuItems: [menuItemSchema]
})

const mainMenuModel = model <INestedMenuItem[]> ('mainMenu', mainMenuSchema)
const quickMenuModel = model <IMenuItem[]> ('quickMenu', quickMenuSchema)

export {
  mainMenuModel,
  quickMenuModel,
  IMenuItem,
  INestedMenuItem,
}