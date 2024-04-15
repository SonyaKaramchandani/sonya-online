import {defineField, defineType} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Picture',
      name: 'picture',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'CV',
      name: 'cv',
      type: 'file',
    }),
  ],
})
