import koa from 'koa'
import fs from 'fs'


const workDir = process.cwd() + '/storage/' + '_v' + Date.now().toString()

async function saveFile (ctx: koa.Context): Promise <void> {
  const { files } = ctx.request as unknown as { files: FormData }
  if (!files) {
    ctx.status = 500
    return
  }

  for (const [key, value] of Object.entries(files)) {
    
    const file = value as File & {filepath: string }
    
    if ('filepath' in file) {
      const reader = fs.createReadStream(file.filepath)
      const writer = fs.createWriteStream(workDir)
      reader.pipe(writer)
    }
  }
  ctx.body = { 
    success: true
  }

  ctx.status = 200
  return
}

export {
  saveFile 
}