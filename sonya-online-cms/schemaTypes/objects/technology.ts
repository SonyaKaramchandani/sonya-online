import {defineField, defineType} from 'sanity'
import {MdBuild as icon} from 'react-icons/md'
import {preview} from 'sanity-plugin-icon-picker'

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
      type: 'iconPicker',
      title: 'Icon',
      options: {
        storeSvg: true,
        providers: ['si'],
      },
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
      title: 'name',
    },
    prepare(selection) {
      const {icon, title} = selection
      return {
        media: preview(icon),
        title: title,
      }
    },
  },
})
