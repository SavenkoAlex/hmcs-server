import koa from 'koa'
import { getAllMenuItems } from '../../services/views/appMenuService'

async function getMenuItems (ctx: koa.Context): Promise <void> {
  try {
    const menuItems = await getAllMenuItems()
    ctx.body = menuItems
    ctx.status = 200
  } catch (err) {
    ctx.status = 500
  }
}

export {
  getMenuItems
}