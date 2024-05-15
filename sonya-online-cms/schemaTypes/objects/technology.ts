import {defineField, defineType} from 'sanity'
import {MdBuild as icon} from 'react-icons/md'
import {preview} from 'sanity-plugin-icon-picker'
import {icons as fileIcons} from '@iconify-json/file-icons'
import {IconComponent} from '../../IconComponent'

const options = {
  storeSvg: true,
  providers: ['f7', 'fa', 'mdi', 'sa', 'hi', 'fi', 'si', 'iy'],
  configurations: [
    {
      title: 'Iconify Icons',
      provider: 'iy',
      icons: () =>
        Object.entries(fileIcons.icons).map(([name]) => {
          return {
            name,
            component: () => IconComponent(`file-icons:${name}`),
            tags: [name],
          }
        }),
    },
  ],
}

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
      options,
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
        media: preview({...icon, options}),
        title: title,
      }
    },
  },
})
