import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.Tweet({ pagination: false })
    t.model.Profile()
    t.model.likedTweet()
    t.model.comments()
  },
})
