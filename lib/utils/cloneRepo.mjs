import download from 'download-git-repo'

const templateRepo = 'https://github.com/LiHowe/lcool-template'

download(templateRepo, process.cwd(), { clone: true },err => {
  console.log(err)
})
