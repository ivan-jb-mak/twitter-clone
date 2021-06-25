import { objectType } from '@nexus/schema'

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.bio()
    t.model.handle()
    t.model.website()
    t.model.avatar()
    t.model.wallpaper()
  },
})
