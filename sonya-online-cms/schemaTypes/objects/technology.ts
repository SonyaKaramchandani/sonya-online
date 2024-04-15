import {defineField, defineType} from 'sanity'
import {MdBuild as icon} from 'react-icons/md'

export default defineType({
  name: 'technology',
  title: 'Technology',
  type: 'object',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the technology',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'iconPicker',
      options: {
        providers: ['f7', 'fa', 'mdi', 'sa', 'hi', 'fi', 'si'],
      },
    }),
  ],
  preview: {
    select: {title: 'name', media: 'icon'},
  },
})
